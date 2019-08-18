pragma solidity 0.5.10;
pragma experimental ABIEncoderV2;

import "./Gatekeeper.sol";
import "./ParameterStore.sol";
import "./IDonationReceiver.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";


contract TokenCapacitor is IDonationReceiver {
    // EVENTS
    event ProposalCreated(
        uint256 proposalID,
        address indexed proposer,
        uint requestID,
        address indexed recipient,
        uint tokens,
        bytes metadataHash
    );
    event TokensWithdrawn(uint proposalID, address indexed to, uint numTokens);
    event BalancesUpdated(
        uint unlockedBalance,
        uint lastLockedBalance,
        uint lastLockedTime,
        uint totalBalance
    );

    // STATE
    using SafeMath for uint;

    // The address of the associated ParameterStore contract
    ParameterStore public parameters;

    // The address of the associated token
    IERC20 public token;

    struct Proposal {
        address gatekeeper;
        uint256 requestID;
        uint tokens;
        address to;
        bytes metadataHash;
        bool withdrawn;
    }

    // The proposals created for the TokenCapacitor.
    Proposal[] public proposals;

    // Token decay table
    uint256 public constant SCALE = 10 ** 12;
    uint256[12] decayMultipliers;
    uint256 constant MAX_UPDATE_DAYS = 4095; // 2^12 - 1
    uint256 constant ONE_DAY_SECONDS = 86400;

    // Balances
    // Tokens available for withdrawal
    uint256 public unlockedBalance;

    // The number of tokens locked as of the last update
    uint256 public lastLockedBalance;

    // The last time tokens were locked
    uint256 public lastLockedTime;

    // The total number of tokens released in the lifetime of the TokenCapacitor
    uint256 public lifetimeReleasedTokens;

    // IMPLEMENTATION
    constructor(ParameterStore _parameters, IERC20 _token, uint256 initialUnlockedBalance) public {
        require(address(_parameters) != address(0), "Parameter store address cannot be zero");
        parameters = _parameters;

        require(address(_token) != address(0), "Token address cannot be zero");
        token = _token;

        require(address(_gatekeeper()) != address(0), "Gatekeeper address cannot be zero");

        // initialize multipliers
        decayMultipliers[0] = 999524050675;
        decayMultipliers[1] = 999048327879;
        decayMultipliers[2] = 998097561438;
        decayMultipliers[3] = 996198742149;
        decayMultipliers[4] = 992411933860;
        decayMultipliers[5] = 984881446469;
        decayMultipliers[6] = 969991463599;
        decayMultipliers[7] = 940883439455;
        decayMultipliers[8] = 885261646641;
        decayMultipliers[9] = 783688183013;
        decayMultipliers[10] = 614167168195;
        decayMultipliers[11] = 377201310488;

        unlockedBalance = initialUnlockedBalance;

        // initialize update time at an even number of days relative to gatekeeper start
        lastLockedTime = _gatekeeper().startTime();
        lastLockedTime = lastLockedTime.add(_adjustedElapsedTime(now));
    }

    function _gatekeeper() private view returns(Gatekeeper) {
        return Gatekeeper(parameters.getAsAddress("gatekeeperAddress"));
    }

    function _createProposal(Gatekeeper gatekeeper, address to, uint tokens, bytes memory metadataHash) internal returns(uint256) {
        require(metadataHash.length > 0, "metadataHash cannot be empty");

        Proposal memory p = Proposal({
            gatekeeper: address(gatekeeper),
            requestID: 0,
            tokens: tokens,
            to: to,
            metadataHash: metadataHash,
            withdrawn: false
        });

        // Request permission from the Gatekeeper and store the proposal data for later.
        // If the request is approved, a user can execute the proposal by providing the
        // proposalID.
        uint requestID = gatekeeper.requestPermission(metadataHash);
        p.requestID = requestID;
        uint proposalID = proposalCount();
        proposals.push(p);

        emit ProposalCreated(proposalID, msg.sender, requestID, to, tokens, metadataHash);
        return proposalID;
    }

    /**
     @dev Create a proposal to send tokens to a beneficiary.
     @param to The account to send the tokens to
     @param tokens The number of tokens to send
     @param metadataHash A reference to metadata describing the proposal
    */
    function createProposal(address to, uint tokens, bytes calldata metadataHash) external returns(uint) {
        Gatekeeper gatekeeper = _gatekeeper();
        return _createProposal(gatekeeper, to, tokens, metadataHash);
    }

    /**
     @dev Create multiple proposals to send tokens to beneficiaries.
     @param beneficiaries The accounts to send tokens to
     @param tokenAmounts The number of tokens to send to each beneficiary
     @param metadataHashes Metadata hashes describing the proposals
    */
    function createManyProposals(
        address[] calldata beneficiaries,
        uint[] calldata tokenAmounts,
        bytes[] calldata metadataHashes
    ) external {
        require(
            beneficiaries.length == tokenAmounts.length && tokenAmounts.length == metadataHashes.length,
            "All inputs must have the same length"
        );

        Gatekeeper gatekeeper = _gatekeeper();
        for (uint i = 0; i < beneficiaries.length; i++) {
            address to = beneficiaries[i];
            uint tokens = tokenAmounts[i];
            bytes memory metadataHash = metadataHashes[i];
            _createProposal(gatekeeper, to, tokens, metadataHash);
        }
    }

    /**
    @dev Withdraw tokens associated with a proposal and send them to the named beneficiary. The
    proposal must have been included in an accepted grant slate.
    @param proposalID The proposal
    */
    function withdrawTokens(uint proposalID) public returns(bool) {
        require(proposalID < proposalCount(), "Invalid proposalID");

        Proposal memory p = proposals[proposalID];
        Gatekeeper gatekeeper = Gatekeeper(p.gatekeeper);

        require(gatekeeper.hasPermission(p.requestID), "Proposal has not been approved");
        require(p.withdrawn == false, "Tokens have already been withdrawn for this proposal");

        proposals[proposalID].withdrawn = true;

        // Accounting
        updateBalances();
        // Withdrawn tokens come out of the unlocked balance
        require(unlockedBalance >= p.tokens, "Insufficient unlocked tokens");
        unlockedBalance = unlockedBalance.sub(p.tokens);

        lifetimeReleasedTokens = lifetimeReleasedTokens.add(p.tokens);

        require(token.transfer(p.to, p.tokens), "Failed to transfer tokens");
        emit TokensWithdrawn(proposalID, p.to, p.tokens);
        return true;
    }

    /**
    @dev Donate tokens on behalf of the given donor.
    Donor of `address(0)` indicates an unspecified donor.
    @param donor The account on behalf of which this donation is being made
    @param tokens The number of tokens to donate
    @param metadataHash A reference to metadata describing the donation
     */
    function donate(address donor, uint tokens, bytes memory metadataHash) public returns(bool) {
        require(tokens > 0, "Cannot donate zero tokens");

        address payer = msg.sender;

        // Donations go into the locked balance
        updateBalances();
        lastLockedBalance = lastLockedBalance.add(tokens);

        // transfer tokens from payer
        require(token.transferFrom(payer, address(this), tokens), "Failed to transfer tokens");

        emit Donation(payer, donor, tokens, metadataHash);
        return true;
    }


    /**
     @dev Number of tokens that will be unlocked by the given (future) time, not counting
     donations or withdrawals
     @param time The time to project for. Must after the lastLockedTime.
     */
    function projectedUnlockedBalance(uint256 time) public view returns(uint256) {
        uint256 futureUnlocked = lastLockedBalance.sub(projectedLockedBalance(time));
        return unlockedBalance.add(futureUnlocked);
    }

    /**
     @dev Number of tokens that will be locked by the given (future) time, not counting
     donations or withdrawals
     @param time The time to project for. Must be after the lastLockedTime.
     */
    function projectedLockedBalance(uint256 time) public view returns(uint256) {
        require(time >= lastLockedTime, "Time cannot be before last locked");
        uint256 elapsedTime = time.sub(lastLockedTime);

        // Based on the elapsed time (in days), calculate the decay factor
        uint256 decayFactor = calculateDecay(elapsedTime.div(ONE_DAY_SECONDS));

        return lastLockedBalance.mul(decayFactor).div(SCALE);
    }

    /**
     @dev Return a scaled decay multiplier. Multiply by the balance, then divide by the scale.
     */
    function calculateDecay(uint256 _days) public view returns(uint256) {
        require(_days <= MAX_UPDATE_DAYS, "Time interval too large");

        uint256 decay = SCALE;
        uint256 d = _days;

        for (uint256 i = 0; i < decayMultipliers.length; i++) {
           uint256 remainder = d % 2;
           uint256 quotient = d >> 1;

           if (remainder == 1) {
                uint256 multiplier = decayMultipliers[i];
                decay = decay.mul(multiplier).div(SCALE);
           } else if (quotient == 0) {
               // Exit early if both quotient and remainder are zero
               break;
           }

           d = quotient;
        }

        return decay;
    }

    /**
     @dev Update the locked and unlocked balances according to the release rate, taking into account
     any donations or withdrawals since the last update. At each step, start decaying anew from the
     lastLockedBalance, as if it were the initial balance.
     @param time The time to update until. Must be less than 4096 days from the lastLockedTime, and
     cannot be in the future.
     */
    function _updateBalancesUntil(uint256 time) internal {
        require(time <= now, "No future updates");

        uint256 totalBalance = token.balanceOf(address(this));

        uint256 elapsedTime = _adjustedElapsedTime(time);
        assert(elapsedTime % ONE_DAY_SECONDS == 0);

        // This is the actual time we are updating until
        uint256 nextLockedTime = lastLockedTime.add(elapsedTime);

        // Sweep the released tokens from locked into unlocked
        // Locked balance is based on the decay since the last update
        uint256 newLockedBalance = projectedLockedBalance(nextLockedTime);
        assert(newLockedBalance <= lastLockedBalance);

        // Calculate the number of tokens unlocked since the last update
        unlockedBalance = lastLockedBalance.sub(newLockedBalance).add(unlockedBalance);

        // Lock any tokens not currently unlocked
        lastLockedBalance = totalBalance.sub(unlockedBalance);

        lastLockedTime = nextLockedTime;
        emit BalancesUpdated(unlockedBalance, lastLockedBalance, nextLockedTime, totalBalance);
    }

    /**
     @dev Update the locked and unlocked balances up until `now`. If necessary, update in intervals
     of 4095 days.
     */
    function updateBalances() public {
        uint256 timeLeft = now.sub(lastLockedTime);
        uint256 daysLeft = timeLeft.div(ONE_DAY_SECONDS);

        // Catch up in intervals of 4095 days
        if (daysLeft > MAX_UPDATE_DAYS) {
            uint256 chunks = daysLeft.div(MAX_UPDATE_DAYS);
            uint256 chunkDuration = MAX_UPDATE_DAYS.mul(ONE_DAY_SECONDS);

            for (uint256 i = 0; i < chunks; i++) {
                _updateBalancesUntil(lastLockedTime.add(chunkDuration));
            }
        }

        // Process the rest of the time left
        _updateBalancesUntil(now);
    }

    function proposalCount() public view returns(uint256) {
        return proposals.length;
    }

    /**
     @dev Get the amount of time elapsed since the last update, adjusted down to the nearest day.
     @param time The time to calculate for. Must be after the lastLockedTime.
     */
    function _adjustedElapsedTime(uint256 time) private view returns(uint256) {
        uint256 elapsedTime = time.sub(lastLockedTime);
        return elapsedTime.sub(elapsedTime.mod(ONE_DAY_SECONDS));
    }
}
