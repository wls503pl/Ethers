// import ethers package
import { ethers } from "ethers";

// Use the public rpc node to connect to the Ethereum network
// Available at https://chainlist.org
const ALCHEMY_MAINNET_URL = 'https://ethereum-rpc.publicnode.com';
const ALCHEMY_SEPOLIA_URL = 'https://ethereum-sepolia-rpc.publicnode.com';

// Connect to Ethereum mainnet
const providerETH = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);
// Connect to Sepolia testnet
const providerSepolia = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);

const main = async () => {
    // Use provider to read chain information
    // 1. Query vitalik's ETH balance on the mainnet and Sepolia testnet
    console.log("\n1. Check vitalik's ETH balance on the mainnet and Sepolia testnet");
    const balance = await providerETH.getBalance(`vitalik.eth`);
    const balanceSepolia = await providerSepolia.getBalance(`0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`);

    // Output the balance in the console (main network)
    console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);
    // Output Sepolia test network ETH balance
    console.log(`Sepolia ETH Balance of vitalik: ${ethers.formatEther(balanceSepolia)} ETH`);

    // 2. Query which chain the provider is connected to
    console.log("\n2. Query which chain the provider is connected to");
    const network = await providerETH.getNetwork();
    console.log(network.toJSON());

    // 3. Query block height
    console.log("\n3. Query block height");
    const blockNumber = await providerETH.getBlockNumber();
    console.log(blockNumber);

    // 4. Query the number of historical transactions in vitalik wallet
    console.log("\n4. Query the number of historical transactions in vitalik wallet");
    const txCount = await providerETH.getTransactionCount(`vitalik.eth`);
    console.log(txCount);

    // 5. Query the current recommended gas settings
    console.log("\n5. Query the current recommended gas settings");
    const feeData = await providerETH.getTransactionCount("vitalik.eth");
    console.log(feeData);

    // 6. Query block information
    console.log("\n6. Query block information");
    const block = await providerETH.getBlock(0);
    console.log(block);

    // 7. Query the contract bytecode given the contract address. The example uses the WETH address
    console.log("7. Query the contract bytecode given the contract address. The example uses the WETH address");
    const code = await providerETH.getCode("0xc778417e063141139fce010982780140aa0cd5ab");
    console.log(code);
}

main()
