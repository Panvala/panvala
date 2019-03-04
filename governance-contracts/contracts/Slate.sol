pragma solidity ^0.5.0;


contract Slate {
    // Possible states for a Slate
    enum Status {
        // Has not been staked on yet
        Unstaked,
        // Was rejected through a vote
        Rejected,
        // Was accepted through no contest or through a vote
        Accepted
    }

    // The account that recommended this slate
    address public recommender;

    // Metadata about the slate
    bytes public metadataHash;

    // Requests included in the slate
    mapping(uint => bool) public requests;

    // The current status of the slate
    Status public status;

    /**
     @dev Initialize a new Slate.
     @param _recommender The account that created the slate
     @param _metadataHash A reference to metadata about the slate
     @param _requestIDs Requests to be granted if the slate is accepted
    */
    constructor(
        address _recommender,
        bytes memory _metadataHash,
        uint[] memory _requestIDs
    )
        public
    {
        require(_recommender != address(0), "Recommender cannot be the zero address");
        require(_metadataHash.length > 0, "Metadata hash cannot be empty");

        recommender = _recommender;
        metadataHash = _metadataHash;

        for (uint i = 0; i < _requestIDs.length; i++) {
            // NOTE: no duplicates
            uint requestID = _requestIDs[i];
            requests[requestID] = true;
        }

        status = Status.Unstaked;
    }
}
