# Contract Class

In ethers, the Contract class is an abstraction of the contract (EVM bytecode) deployed on the Ethereum network. Through it, developers can easily read calls and transactions on contracts,
and obtain transaction results and events. The power of Ethereum lies in contracts, so you must be proficient in contract operations.

## Read-only and read-write contracts

**Contract** objects are divided into two categories, read-only and read-write. Read-only Contracts can only read contract information on the chain and perform *call* operations, that is,
call **view** and **pure** functions in the contract, but cannot perform **transactions**. The methods for creating these two types of **Contract** variables are different:
- **Read-only Contract**: The parameters are the contract address, contract **abi** and **provider** variable (read-only).
```
const contract = new ethers.Contract(`address`, `abi`, `provider`);
```
- **Read-Write Contract**: The parameters are contract address, contract **abi** and **signer** variable. **Signer** is another class in ethers, used to sign transactions.
```
const contract = new ethers.Contract(`address`, `abi`, `signer`);
```
Note that **call** in ethers refers to a read-only operation, which is different from call in solidity.

- **Step1**: Create Provider.<br>
```
// import ethers package
import { ethers } from "ethers";

// Use the public rpc node to connect to the Ethereum network
// Available at https://chainlist.org
const ALCHEMY_MAINNET_URL = 'https://ethereum-rpc.publicnode.com';

// Connect to Ethereum mainnet
const providerETH = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);
```

- **Step2**: Create a read-only Contract instance.
To create a read-only Contract instance, you need to fill in 3 parameters, namely the contract address, contract abi and provider variable.<br>
ABI (Application Binary Interface) is the standard for interacting with Ethereum smart contracts, ethers supports two abi filling methods:<br>
**Method 1**. Directly input the contract abi. You can copy it from the compilation page of remix, get it from the json file in the artifact folder generated when compiling the contract locally,
or get it from the code page of the etherscan open source contract. We use this method to create a WETH contract instance:<br><br>
![]()<br><br>

```
// The first way to enter abi: copy the full text of abi
// WETH's abi can be copied here: https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code
const abiWETH = '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]';
const addressWETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';      // WETH Contract
const contractWETH = new ethers.Contract(addressWETH, abiWETH, providerETH);
```
<br><br><br>
**Method 2**. Since the readability of abi is too poor, ethers innovatively introduced Human-Readable Abi. Developers can write abi through function signature and event signature. We use this method to create a contract instance of the stablecoin DAI:
```
// The second way to input abi: input the functions needed by the program, separated by commas, ethers will automatically convert them into the corresponding abi for you
// Human-readable abi, taking ERC20 contract as an example
const abiERC20 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
];
const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F'      // DAI Contract
const contractDAI = new ethers.Contract(addressDAI, abiERC20, provider)
```

- **Step3**: Read on-chain information of WETH and DAI
Use the read-only Contract instance to call the view and pure functions of the contract to obtain the on-chain information:
```
const main = async () => {
    // 1. Read the on-chain information of the WETH contract (WETH abi)
    const nameWETH = await contractWETH.name()
    const symbolWETH = await contractWETH.symbol()
    const totalSupplyWETH = await contractWETH.totalSupply()
    console.log("\n1. Read WETH contract information")
    console.log(`Contract Address: ${addressWETH}`)
    console.log(`Name: ${nameWETH}`)
    console.log(`Symbol: ${symbolWETH}`)
    console.log(`Total Supply: ${ethers.formatEther(totalSupplyWETH)}`)
    const balanceWETH = await contractWETH.balanceOf('vitalik.eth')
    console.log(`Vitalik holds: ${ethers.formatEther(balanceWETH)}\n`)

    // 2. Read the on-chain information of the DAI contract (IERC20 interface contract)
    const nameDAI = await contractDAI.name()
    const symbolDAI = await contractDAI.symbol()
    const totalSupplDAI = await contractDAI.totalSupply()
    console.log("\n2. Read DAI contract information")
    console.log(`Contract Address: ${addressDAI}`)
    console.log(`Name: ${nameDAI}`)
    console.log(`Symbol: ${symbolDAI}`)
    console.log(`Total Supply: ${ethers.formatEther(totalSupplDAI)}`)
    const balanceDAI = await contractDAI.balanceOf('vitalik.eth')
    console.log(`Vitalik holds: ${ethers.formatEther(balanceDAI)}\n`)
}

main()
```
