pragma solidity 0.5.10;

/**
 * @title Donation receiver interface
 * @dev Contracts (like the TokenCapacitor) that can receive donations
 */
interface IDonationReceiver {
    event Donation(address indexed payer, address indexed donor, uint numTokens, bytes metadataHash);

    function donate(address donor, uint tokens, bytes calldata metadataHash) external returns(bool);
}
