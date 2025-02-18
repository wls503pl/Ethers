// Use the Wallet class to send ETH
import { clear } from "console";
import { ethers } from "ethers";

// Use Alchemy's rpc node to connect to the Ethereum test network
const ALCHEMY_SEPOLIA_URL = 'https://ethereum-rpc.publicnode.com';
const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);

// Create a random wallet object
const wallet1 = ethers.Wallet.createRandom()
const wallet1WithProvider = wallet1.connect(provider)
const mnemonic = wallet1.mnemonic       // Get the mnemonic

// Create a wallet object using the private key and provider
const privateKey = '0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b'
const wallet2 = new ethers.Wallet(privateKey, provider)

// Create a wallet object from the mnemonic
const wallet3 = ethers.Wallet.fromPhrase(mnemonic.phrase)

const main = async () => {
    // 1. Get the wallet address
    const address1 = await wallet1.getAddress()
    const address2 = await wallet2.getAddress() 
    const address3 = await wallet3.getAddress()
    console.log(`\n1. Get wallet address`);
    console.log(`Wallet 1 Address: ${address1}`);
    console.log(`Wallet 2 Address: ${address2}`);
    console.log(`Wallet 3 Address: ${address3}`);
    console.log(`Are the addresses of wallet 1 and wallet 3 the same?: ${address1 === address3}`);

    // 2. Get the mnemonic
    console.log(`\n2. Get mnemonic`);
    console.log(`Wallet1 mnemonic: ${wallet1.mnemonic.phrase}`)
    
    // Note: The wallet generated from the private key has no mnemonic phrase
    // console.log(wallet2.mnemonic.phrase)

    // 3. Get the private key
    console.log(`\n3. Get private key`);
    console.log(`Wallet1 private key: ${wallet1.privateKey}`)
    console.log(`Wallet2 private key: ${wallet2.privateKey}`)

    // 4. Get the number of transactions sent on the chain
    console.log(`\n4. Get the number of transactions on the chain`);
    const txCount1 = await provider.getTransactionCount(wallet1WithProvider)
    const txCount2 = await provider.getTransactionCount(wallet2)
    console.log(`Number of transactions sent by wallet 1: ${txCount1}`)
    console.log(`Number of transactions sent by wallet 2: ${txCount2}`)

    // 5. Send ETH
    // If this wallet does not have sepolia testnet ETH, go to the faucet to get some
    // Chainlink Faucets: https://faucets.chain.link
    console.log(`\n5. Send ETH (test network)`);

    // i. Print the balance before the transaction
    console.log(`\ni. Balance before sending`)
    console.log(`Wallet1: ${ethers.formatEther(await provider.getBalance(wallet1WithProvider))} ETH`)
    console.log(`Wallet2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`)

    // ii. Construct a transaction request, parameters: to is the receiving address, value is the ETH amount
    const tx = {
        to: address1,
        value: ethers.parseEther("0.001")
    }

    // iii. Send transaction and get receipt
    console.log(`\nii. Waiting for the transaction to be confirmed in the blockchain (it takes a few minutes)`)
    const receipt = await wallet2.sendTransaction(tx)
    await receipt.wait()            // Wait for transaction confirmation on the chain
    console.log(receipt)            // Print transaction details

    // iv. Print the balance after the transaction
    console.log(`\niii. Balance after sending`)
    console.log(`Wallet1: ${ethers.formatEther(await provider.getBalance(wallet1WithProvider))} ETH`)
    console.log(`Wallet2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`)
}

main()
