import { ethers } from "ethers";

// Use rpc node of Alchemy to connect Ethereum
const ALCHEMY_SEPOLIA_URL = 'https://eth-sepolia.api.onfinality.io/public';
const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);

// Use private-key and provider to create wallet object
const privateKey = '0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b'
const wallet = new ethers.Wallet(privateKey, provider);

// WETH's ABI
const abiWETH = [
    "function balanceOf(address) public view returns(uint)",
    "function deposit() public payable",
    "function transfer(address, uint) public returns (bool)",
    "function withdraw(uint) public",
];

// WETH contract address (Sepolia test network)
const addressWETH = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'

// WETH Contract

//Declare a writable contract
const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet)
// You can also declare a read-only contract and then use the connect(wallet) function to convert it into a writable contract.
// const contractWETH = new ethers.Contract(addressWETH, abiWETH, provider)
// contractWETH.connect(wallet)

const main = async () => {
    const address = await wallet.getAddress()
    // 1. Read the on-chain information of the WETH contract (WETH abi)
    console.log("\n1. Read WETH balance")
    const balanceWETH = await contractWETH.balanceOf(address)
    console.log("WETH holdings before deposit: ${ethers.formatEther(balanceWETH)}\n")

    // Read the ETH balance in the wallet
    const balanceETH = await provider.getBalance(wallet)

    // If the wallet has enough ETH
    if (ethers.formatEther(balanceETH) > 0.0015) {
        // 2. Call the deposit() function to convert 0.001 ETH to WETH
        console.log("\n2. Call deposit() function and deposit 0.001 ETH")
        // Initiate a transaction
        const tx = await contractWETH.deposit({value: ethers.parseEther("0.001")})

        // Waiting for the transaction to be uploaded
        await tx.wait()
        console.log(`Transaction details:`)
        console.log(tx)
        const balanceWETH_deposit = await contractWETH.balanceOf(address)
        console.log(`WETH position after deposit: ${ethers.formatEther(balanceWETH_deposit)}\n`)

        // 3. Call the transfer() function to transfer 0.001 WETH to vitalik
        console.log("\n3. Call transfer() function to transfer 0.001 WETH to vitalik")
        // Initiate a transaction
        const tx2 = await contractWETH.transfer("vitalik.eth", ethers.parseEther("0.001"))
        // Waiting for the transaction to be uploaded
        await tx2.wait()
        const balanceWETH_transfer = await contractWETH.balanceOf(address)
        console.log(`WETH holdings after transfer: ${ethers.formatEther(balanceWETH_transfer)}\n`)
    }
    else {
        // If ETH is insufficient
        console.log("Not enough ETH, go to the faucet to get some Goerli ETH")
        console.log("1. chainlink faucet: https://faucets.chain.link")
    }
}

main()
