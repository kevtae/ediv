pragma solidity >=0.4.21 <0.7.0;

contract StringStorage {
    string name;

    function set(string memory x) public {
        name = x;
    }

    function get() public view returns (string memory) {
        return name;
    }
}
