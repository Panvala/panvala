pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


/**
* @title RestrictedToken
* @dev An ERC20 token that can only be transferred to whitelisted accounts.
*/
contract RestrictedToken is Ownable, ERC20, ERC20Detailed {
    // Approved recipients of the token
    mapping (address => bool) _whitelist;

    // events
    event Whitelisted(address whitelisted);
    event Removed(address removed);

    /**
    * @dev Initialize a restricted token. `msg.sender` gets all the tokens.
    * @param name The token name
    * @param symbol The token's symbol
    * @param decimals The number of decimals
    * @param initialSupply The supply of tokens
    * @param initialWhitelist The initial set of accounts approved to receive token transfers.
    */
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint initialSupply,
        address[] memory initialWhitelist
    )
        public
        ERC20Detailed(name, symbol, decimals)
    {
        // Owner gets the initial supply
        _mint(msg.sender, initialSupply);

        // Whitelist the initial set of accounts. Duplicate addresses are a noop.
        for (uint i = 0; i < initialWhitelist.length; i++) {
            address account = initialWhitelist[i];
            addToWhitelist(account);
        }
    }

    // Whitelist functions
    /**
    * @dev Check if an account is whitelisted for transfers
    * @param account The address to check
    * @return true if the account is whitelisted
    */
    function isWhitelisted(address account) public view returns (bool) {
        return _whitelist[account];
    }

    /**
    * @dev Add an account to the whitelist for transfers. Revert on zero address.
    * @param account The address to add
    */
    function addToWhitelist(address account) public onlyOwner {
        require(account != address(0), "Invalid account address");
        require(isWhitelisted(account) == false, "Account is already whitelisted");

        _whitelist[account] = true;
        emit Whitelisted(account);
    }

    /**
    * @dev Remove an account from the whitelist for transfers. Revert on zero address.
    * @param account The address to remove
    */
    function removeFromWhitelist(address account) public onlyOwner {
        require(account != address(0), "Invalid account address");
        require(isWhitelisted(account) == true, "Cannot remove a non-whitelisted account");

        _whitelist[account] = false;
        emit Removed(account);
    }

    // Overrides
    /**
    * @dev Transfer token for a specified address
    * @param to The address to transfer to.
    * @param value The amount to be transferred.
    * @return true if the transfer was successful
    */
    function transfer(address to, uint256 value) public returns (bool) {
        require(isWhitelisted(to), "Token cannot be be transferred to non-whitelisted address");
        return super.transfer(to, value);
    }

    /**
     * @dev Transfer tokens from one address to another.
     * Note that while this function emits an Approval event, this is not required as per the specification,
     * and other compliant implementations may not emit the event.
     * @param from address The address which you want to send tokens from
     * @param to address The address which you want to transfer to
     * @param value uint256 the amount of tokens to be transferred
     * @return true if the transfer was successful
     */
    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(isWhitelisted(to), "Token cannot be be transferred to non-whitelisted address");
        return super.transferFrom(from, to, value);
    }
}
