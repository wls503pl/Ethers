// Listening contract method:
// 1. Continuous listening
// contractUSDT.on("event name", Listener)
// 2. Listen only once
// contractUSDT.once("Event Name", Listener)
import { ethers } from "ethers";

// prepare Alchemy API
const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/2Pc6Ms3EX5OoAN9maUcmdhYkME-NAja6'

// connect to main-net provider
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL)

// USDT's contract address
const contractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'

// Constructing USDT's Transfer ABI
const abi = [
    "event Transfer(address indexed from, address indexed to, uint value)" 
];

// Generate USDT contract object
const contractUSDT = new ethers.Contract(contractAddress, abi, provider)

const main = async () => {
    // listening USDT contract's Transfer event
    try {
        // only listening once
        console.log("\n1. use contract.once() to listening Transfer event once")
        contractUSDT.once('Transfer', (from, to, value) => {
            // print result
            console.log(
                `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value), 6)}`
            )
        })

        // continuously listening USDT's contract
        console.log("\n2. use contract.on() to listening Transfer event continuously")
        contractUSDT.on('Transfer', (from, to, value) => {
            // print result
            console.log(
                `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value), 6)}`
            )
        })
    }
    catch (e)
    {
        console.log(e)
    }
}

main()
