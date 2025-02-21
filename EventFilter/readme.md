# Abstract

Based on the contract monitoring, we expand it and add filters during the monitoring process to monitor the transfer in and out of the specified address.

## Building filters

The contract class in **ethers.js** provides **contract.filters** to simplify the creation of filters:

```
const filter = contract.filters.EVENT_NAME(...args)
```

**EVENT_NAME** is the name of the event to be filtered, and **...args** is the subject set/condition, here are a few examples.

1. Filter *Transfer* events from address **myAddress**

```
contract.filters.Transfer(myAddress)
```

2. Filter all *Transfer* events sent to address **myAddress**

```
contract.filters.Transfer(null, myAddress)
```

3. Filter all *Transfer* events sent from **myAddress** to **otherAddress**

```
contract.filters.Transfer(myAddress, otherAddress)
```

4. Filter all *Transfer* events sent to **myAddress** or **otherAddress**

```
contract.filters.Transfer(null, [myAddress, otherAddress])
```

# Monitor USDT transfers on exchanges

1. USDT transfers from Binance

Before monitoring the USDT contract, we need to understand the transaction **logs**, including the **topics** and **data** of the event. Let's firstly find a transaction that transfers USDT from Binance Exchange, and then check its details on etherscan through hash:
Transaction Hash: [0xab1f7b575600c4517a2e479e46e3af98a95ee84dd3f46824e02ff4618523fff5](https://etherscan.io/tx/0xab1f7b575600c4517a2e479e46e3af98a95ee84dd3f46824e02ff4618523fff5)
<br>
![]()<br>

This transaction did one thing: transferred 2983.98 USDT from **binance14** (Binance hot wallet) to address 0x354de44bedba213d612e92d3248b899de17b0c58.

View the event log information:
<br>
![]()<br>

- **address**: USDT contract address
- **topics[0]**: Event hash, keccak256("Transfer(address, address, uint256)")
- **topics[1]**: Transfer out address (Binance exchange hot wallet)
- **topics[2]**: Transfer in address
- **data**: Transfer amount

2. Create **provider**, **abi**, **USDT** contract variable:

```
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL)
// contract address
const addressUSDT = '0xdac17f958d2ee523a2206206994597c13d831ec7'
// Exchange Address
const accountBinance = '0x28C6c06298d514Db089934071355E5743bf21d60'
// Construct ABI
const abi = [
  "event Transfer(address indexed from, address indexed to, uint value)",
  "function balanceOf(address) public view returns(uint)",
];
// construct contract object
const contractUSET = new ethers.Contract(addressUSDT, abi, provider)
```

3. Read the USDT balance in Binance hot wallet

```
const balanceUSDT = await contractUSDT.balanceOf(accountBinance)
console.log(`USDT Balance: ${ethers.formatUnits(balanceUSDT, 6)}\n`)
```

4. Create Filter, listening Event of USDT transferred into Binance account

```
// 2. Create Filter, listening to USDT transferred into Exchange
console.log("\n2. Create Filter, listening to USDT transferred into Exchange")
let filterBinanceIn = contractUSDT.filters.Transfer(null, accountBinance);
console.log("Filter details: ")
console.log(filterBinanceIn)
contractUSDT.on(filterBinanceIn, (res) => {
  console.log('------ Listening Event of USDT transferred into Exchanges ------')
  console.log(`${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(res.args[2], 6)}`)
})
```
