// SPDX-License-Identifier: MIT

pragma solidity ^0.8.21;

/**
 * @dev ERC20 interface contract.
 */
interface IERC20 {
    /**
     * @dev Release condition: when `value` units of currency are transferred from an account (`from`) to another account (`to`).
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Release condition: When the currency of `value` unit is authorized from an account (`owner`) to another account (`spender`).
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the total token supply.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the number of tokens held by account `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Transfers `amount` units of tokens from the caller account to another account `to`.
     * If successful, returns `true`.
     * Releases the {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /**
     * @dev returns the amount authorized by the `owner` account to the `spender` account. The default value is 0.
     * When {approve} or {transferFrom} is called, `allowance` will change.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev The caller account authorizes `amount` amount of tokens to the `spender` account.
     * If successful, returns `true`.
     * Releases the {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Through the authorization mechanism, transfer `amount` number of tokens from
     * the `from` account to the `to` account. The transferred part will be deducted from the caller's `allowance`.
     * If successful, returns `true`.
     *  Trigger the {Approval} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}
