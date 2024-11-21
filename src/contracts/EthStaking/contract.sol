
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract EthStaking is ReentrancyGuard {
    using SafeMath for uint256;

    mapping(address => uint256) private _stakes;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);

    receive() external payable {
        stake();
    }

    function stake() public payable {
        require(msg.value > 0, "Cannot stake 0 ETH");
        _stakes[msg.sender] = _stakes[msg.sender].add(msg.value);
        emit Staked(msg.sender, msg.value);
    }

    function unstake(uint256 amount) external nonReentrant {
        require(amount > 0, "Cannot unstake 0 ETH");
        require(_stakes[msg.sender] >= amount, "Insufficient staked amount");

        _stakes[msg.sender] = _stakes[msg.sender].sub(amount);
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        emit Unstaked(msg.sender, amount);
    }

    function getStakedAmount(address user) external view returns (uint256) {
        return _stakes[user];
    }
}
