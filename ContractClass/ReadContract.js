// import ethers package
import { ethers } from "ethers";

// Use the public rpc node to connect to the Ethereum network
// Available at https://chainlist.org
const ALCHEMY_MAINNET_URL = 'https://ethereum-rpc.publicnode.com';
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

// The 1st way to enter abi: copy the full text of abi
// WETH's abi can be copied here: https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code
const abiWETH =
    '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs": \
     [{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs": \
     [{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs": \
     [{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"}, \
     {"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}, \
     {"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}, \
     {"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs": \
     [{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs": \
     [],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"}, \
     {"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs": \
     [],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}, \
     {"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}, \
     {"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"}, \
     {"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs": \
     [{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"}, \
     {"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"}, \
     {"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]';

const addressWETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';           // WETH Contract
const contractWETH = new ethers.Contract(addressWETH, abiWETH, provider);

/**
 * The 2nd way to input abi:
 * input the functions needed by the program, separated by commas, and ethers will automatically convert them into the corresponding abi for you
 * Human-readable abi, taking ERC20 contract as an example
 */
const abiERC20 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
];

const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';            // DAI Contract
const contractDAI = new ethers.Contract(addressDAI, abiERC20, provider);

const main = async () => {
    // 1. Read the on-chain information of the WETH contract (WETH abi)
    const nameWETH = await contractWETH.name()
    const symbolWETH = await contractWETH.symbol()
    const totalSupplyWETH = await contractWETH.totalSupply()
    console.log("\n1. Read WETH contract information")
    console.log(`Contract Address: ${addressWETH}`)
    console.log(`name: ${nameWETH}`)
    console.log(`symbol: ${symbolWETH}`)
    console.log(`total Supply: ${ethers.formatEther(totalSupplyWETH)}`)
    const balanceWETH = await contractWETH.balanceOf('vitalik.eth')
    console.log(`Vitalik holds: ${ethers.formatEther(balanceWETH)}\n`)

    // 2. Read the on-chain information of the DAI contract (IERC20 interface contract)
    const nameDAI = await contractDAI.name()
    const symbolDAI = await contractDAI.symbol()
    const totalSupplyDAI = await contractDAI.totalSupply()
    console.log("\n2. Read DAI contract information")
    console.log(`Contract Address: ${addressDAI}`)
    console.log(`name: ${nameDAI}`)
    console.log(`symbol: ${symbolDAI}`)
    console.log(`total Supply: ${ethers.formatEther(totalSupplyDAI)}`)
    const balanceDAI = await contractDAI.balanceOf('vitalik.eth')
    console.log(`Vitalik holds: ${ethers.formatEther(balanceWETH)}\n`)
}

main()
