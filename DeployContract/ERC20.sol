// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./IERC20.sol";

contract ERC20 is IERC20 {
    mapping(address => uint256) public override balanceOf;
    mapping(address => mapping(address => uint256)) public override allowance;
    uint256 public override totalSupply;    // total supply of token
    string public name;                     // token name
    string public symbol;                   // token symbol
    uint8 public decimals = 18;             // decimal places

    // @dev implements the contract name and symbol when the contract is deployed
    constructor(string memory name_, string memory symbol_)
    {
        name = name_;
        symbol = symbol_;
    }

    // @dev implements the `transfer` function, token transfer logic
    function transfer(address recipient, uint amount) external override returns (bool)
    {
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    // @dev implements the `approve` function, token authorization logic
    function approve(address spender, uint amount) external override returns (bool)
    {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    // @dev implements the `transferFrom` function, token authorization transfer logic
    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external override returns (bool) {
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    // @dev mints tokens, transfers from `0` address to the caller address
    function mint(uint amount) external {
        balanceOf[msg.sender] += amount;
        totalSupply += amount;
        emit Transfer(address(0), msg.sender, amount);
    }

    // @dev destroys tokens and transfers from the caller address to the `0` address
    function burn(uint amount) external {
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }
}