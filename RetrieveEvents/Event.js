// method to retrieve events
// const transferEvents = await contract.queryFilter("Event name", [Strat Bock height , End block height])
import { ethers } from "ethers";

// use Alchemy's rpc node to connect ethereum
const ALCHEMY_GOERLI_URL = 'https://eth-goerli.alchemyapi.io/v2/GlaeWuylnNM3uuOo-SAwJxuwTdqHaY5l';
const provider = new ethers.JsonRpcProvider(ALCHEMY_GOERLI_URL);

// WETH ABI, Only contains the Transfer events we are concerned with
const abiWETH = [
    "event Transfer(address indexed from, address indexed to, uint amount)"
];

// WETH address of Testnet
const addressWETH = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'

// Declare contract instance
const contract = new ethers.Contract(addressWETH, abiWETH, provider)

const main = async () => 
{
    // Get the Transfer events within the past 10 blocks
    console.log("\n1. Get the Transfer events in the past 10 blocks and print out 1")
    // Get current block
    const block = await provider.getBlockNumber()
    console.log(`current block's height: ${block}`)
    console.log(`print event details:`)
    const transferEvents = await contract.queryFilter('Transfer', block - 10, block)

    // Print the 1st Transfer event
    console.log(transferEvents[0])

    // Parse data of Transfer Event (variables in args)
    console.log("\n2. Parse events: ")
    const amount = ethers.formatUnits(ethers.getBigInt(transferEvents[0].args["amount"]), "ether")
    
}
