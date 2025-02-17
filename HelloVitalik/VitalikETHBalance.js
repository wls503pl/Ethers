// Import the ethers package
import { ethers } from "ethers";

const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/2Pc6Ms3EX5OoAN9maUcmdhYkME-NAja6';
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL)

const main = async () => {
    // Query vitalik's ETH balance
    const balance = await provider.getBalance(`vitalik.eth`);
    // Output the balance to the console
    console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);}
main()
