// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Investment {
    event Funded(address indexed investor, address indexed startup, uint256 amount);

    mapping(address => uint256) public startupBalance;

    function invest(address payable _startup) external payable {
        require(msg.value > 0, "Investment must be greater than 0");
        startupBalance[_startup] += msg.value;
        _startup.transfer(msg.value);
        emit Funded(msg.sender, _startup, msg.value);
    }

    function getBalance(address _startup) external view returns (uint256) {
        return startupBalance[_startup];
    }
}
