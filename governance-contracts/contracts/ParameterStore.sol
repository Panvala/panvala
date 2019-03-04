pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;


contract ParameterStore {
    // EVENTS
    event ParameterSet(bytes32 key, uint value);


    // STATE
    mapping(bytes32 => uint) public params;

    // IMPLEMENTATION
    /**
     @dev Initialize a ParameterStore with a set of names and associated values.
     @param _names Names of parameters
     @param _values Values to assign them
    */
    constructor(string[] memory _names, uint[] memory _values) public {
        // NOTE: _keys and _values must have the same length

        for (uint i = 0; i < _names.length; i++) {
            string memory name = _names[i];
            set(name, _values[i]);
        }
    }

    /**
     @dev Get the parameter value associated with the given name.
     @param _name The name of the parameter to get the value for
    */
    function get(string memory _name) public view returns (uint value) {
        // TODO: what if the value doesn't exist?
        return params[keccak256(abi.encodePacked(_name))];
    }

    /**
     @dev Assign the parameter with the given key to the given value.
     @param _name The name of the parameter to be set
     @param _value The value to assign the parameter
    */
    function set(string memory _name, uint _value) private {
        bytes32 key = keccak256(abi.encodePacked(_name));
        params[key] = _value;
        emit ParameterSet(key, _value);
    }
}
