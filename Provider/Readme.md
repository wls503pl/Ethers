# Provider Class

The \"Provider\" class is an abstraction of the Ethereum network connection, providing a simple and consistent interface for standard Ethereum node functions.
In ethers, the \"Provider\" does not touch the user's private key and can only read information on the chain, not write it, which is safer than \"web3.js\".

In addition to the default provider \"defaultProvider\" introduced earlier, the most commonly used one in ethers is \"jsonRpcProvider\", which allows users to connect to nodes of specific node service providers.

## Connect to public nodes

Here, we use the public node on [Chainlist](https://chainlist.org/) as an example.
After finding the appropriate rpc, you can use the ethers.JsonRpcProvider() method to create a Provider variable, which takes the URL link of the node service as a parameter.<br>
In the following example, we create providers that connect to the ETH mainnet and the Sepolia testnet respectively:

Firstly, find available RPC Server Address:
- ETH Main Net:
![]()<br>
- Sepolia Test Net:
![]()<br>

```
// Use the public rpc node to connect to the Ethereum network
// Available at https://chainlist.org
const ALCHEMY_MAINNET_URL = 'https://ethereum-rpc.publicnode.com';
const ALCHEMY_SEPOLIA_URL = 'https://ethereum-sepolia-rpc.publicnode.com';

// Connect to Ethereum mainnet
const providerETH = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);
// Connect to Sepolia testnet
const providerSepolia = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);
```

## Using "Provider" to read on-chain data

The \"Provider\" class encapsulates some methods to easily read data on the chain:<br>
1. Use the ***getBalance()*** function to read Vitalik's **ETH** balance on the mainnet and testnet (the testnet currently does not support **ENS** domain names and can only be queried using the wallet address):
```
// 1. Query vitalik's ETH balance on the mainnet and Sepolia testnet
console.log("\n1. Check vitalik's ETH balance on the mainnet and Sepolia testnet");
const balance = await providerETH.getBalance(`vitalik.eth`);
const balanceSepolia = await providerSepolia.getBalance(`0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`);

// Output the balance in the console (main network)
console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);
// Output Sepolia test network ETH balance
console.log(`Sepolia ETH Balance of vitalik: ${ethers.formatEther(balanceSepolia)} ETH`);
```

2. Use ***getNetwork()*** to query which chain the provider is connected to. Homestead represents the ETH mainnet:
```
// 2. Query which chain the provider is connected to
console.log("\n2. Query which chain the provider is connected to");
const network = await providerETH.getNetwork();
console.log(network.toJSON());
```

3. Use ***getBlockNumber()*** to query the current block height:
```
// 3. Query block height
console.log("\n3. Query block height");
const blockNumber = await providerETH.getBlockNumber();
console.log(blockNumber);
```

4. Use ***getTransactionCount()*** to query the historical transaction count of a wallet:
```
// 4. Query the number of historical transactions in vitalik wallet
console.log("\n4. Query the number of historical transactions in vitalik wallet");
const txCount = await providerETH.getTransactionCount(`vitalik.eth`);
console.log(txCount);
```

5. Use ***getFeeData()*** to query the currently recommended gas setting. The returned data format is bigint:
```
// 5. Query the current recommended gas settings
console.log("\n5. Query the current recommended gas settings");
const feeData = await providerETH.getTransactionCount("vitalik.eth");
console.log(feeData);
```

6. Use ***getBlock()*** to query block information, the parameter is the block height to be queried:
```
// 6. Query block information
console.log("\n6. Query block information");
const block = await providerETH.getBlock(0);
console.log(block);
```

7. Use ***getCode()*** to query the contract **bytecode** of a certain address. The parameter is the contract address. The following example uses the contract address of the main network **WETH**:
```
// 7. Query the contract bytecode given the contract address. The example uses the WETH address
console.log("7. Query the contract bytecode given the contract address. The example uses the WETH address");
const code = await providerETH.getCode("0xc778417e063141139fce010982780140aa0cd5ab");
console.log(code);
```

## Check Results:

![]()
