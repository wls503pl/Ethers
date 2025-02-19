# Goal of this Case

This section describes how to declare a writable Contract variable and use it to interact with the WETH contract on the testnet.

## Creating a writable Contract variable

Rules for declaring writable **Contract** variables:

```
const contract = new ethers.Contract(address, abi, signer)
```

Where address is the contract address, abi is the contract's abi interface, and signer is the wallet object. Note that you need to provide signer here, while you only need to provide provider when declaring a readable contract.
You can also convert a readable contract into a writable contract using the following method:

```
const contract2 = contract.connect(signer)
```

## Contract Interaction

Read contract information. It does not require gas. Here we introduce writing contract information, you need to construct a transaction and pay gas. The transaction will be verified by every node and miner on the entire network and change the blockchain state.
You can use the following methods to interact with the contract:

```
// send transaction
const tx = await contract.METHOD_NAME(args [, overrides])
// wait for transaction verification on chain
await tx.wait()
```

Where **METHOD_NAME** is the name of the function being called, **args** is the function parameter, and **[, overrides]** is the data that can be passed in, including:
- **gasPrice**: gas price
- **gasLimit**: gas limit
- **value**: the ether passed in when calling (in wei)
- **nonce**: random number

**Note**: This method cannot obtain the return value of the contract execution. If necessary, use Solidity event records and then use transaction receipts to query.

## Example: Interacting with the testnet WETH contract

WETH (Wrapped ETH) is a wrapped version of ETH, which uses smart contracts to wrap Ethereum native tokens into ERC20-compliant tokens.

1. Create **provider** and **wallet** variable

```
import { ethers } from "ethers";

// Use rpc node of Alchemy to connect Ethereum
const ALCHEMY_SEPOLIA_URL = 'wss://ethereum-sepolia-rpc.publicnode.com';
const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);

// Use private-key and provider to create wallet object
const privateKey = '0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b'
const wallet = new ethers.Wallet(privateKey, provider);
```

2. Create writable WETH contract variable, we add 4 functions into ABI(Application Binary Interface)

- ***balanceOf(address)***: Query the WETH balance of the address.
- ***deposit()***: Convert the **ETH** transferred into the contract into **WETH**.
- ***transfer(address, uint256)***: Do Transaction.
- ***withdraw(uint256)***: Assets withdrawal.

```
// WETH's ABI
const abiWETH = [
  "function balanceOf(address) public view returns(uint)",
  "function deposit() public payable",
  "function transfer(address, uint) public returns (bool)",
  "function withdraw(uint) public",
];

// WETH contract address (Sepolia Testnet)
const addressWETH = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'      // WETH Contract

// Declare Writable Contract
const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet)

// You can also declare a read-only contract and then use the connect(wallet) function to convert it into a writable contract.
// const contractWETH = new ethers.Contract(addressWETH, abiWETH, provider)
// contractWETH.connect(wallet)
```

3. Read account WETH balance

```
const address = await wallet.getAddress()

// Read the on-chain information of the WETH contract (WETH abi)
console.log("\n1. Read WETH balance")
const balanceWETH = await contractWETH.balanceOf(address)
console.log(`WETH holdings before deposit: ${ethers.formatEther(balanceWETH)}\n`)
```
<br>
![]()<br>

4. 
