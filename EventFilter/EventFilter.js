import { ethers } from "ethers";

// use Alchemy's rpc node to connect to ETH net
const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.alchemyapi.io/v2/2Pc6Ms3EX5OoAN9maUcmdhYkME-NAja6';
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

// Contract Address
const addressUSDT = '0xdac17f958d2ee523a2206206994597c13d831ec7'
// Exchanges Addres
const accountBinance = '0x28C6c06298d514Db089934071355E5743bf21d60'
// construct ABI
const abi = [
  "event Transfer(address indexed from, address indexed to, uint value)",
  "function balanceOf(address) public view returns(uint)",
];
// construct contract object
const contractUSDT = new ethers.Contract(addressUSDT, abi, provider);


(async () => {
  try {
    // 1. Read the USDT balance in Binance hot wallet
    console.log("\n1. Read the USDT balance in Binance hot wallet")
    const balanceUSDT = await contractUSDT.balanceOf(accountBinance)
    console.log(`USDT Balance: ${ethers.formatUnits(balanceUSDT,6)}\n`)

    // 2. Create Filter, listening Event USDT transferred into Exchanges
    console.log("\n2. listening Event USDT transferred into Exchanges")
    let filterBinanceIn = contractUSDT.filters.Transfer(null, accountBinance);
    console.log("Filter Details: ")
    console.log(filterBinanceIn);
    contractUSDT.on(filterBinanceIn, (res) => {
      console.log('--------- listening Event USDT transferred into Exchanges --------');
      console.log(
        `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(res.args[2],6)}`
      )
    })

    // 3. Create Filter, Listening to Event USDT transferred out from Exchange
    let filterToBinanceOut = contractUSDT.filters.Transfer(accountBinance);
    console.log("\n3. Create Filter, Listening to Event USDT transferred out from Exchange")
    console.log("Filter Details: ")
    console.log(filterToBinanceOut);
    contractUSDT.on(filterToBinanceOut, (res) => {
      console.log('--------- Listening to Event USDT transferred out from Exchange --------');
      console.log(
        `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(res.args[2],6)}`
      )
    });
  } catch (e) {
    console.log(e);
  }
})()
