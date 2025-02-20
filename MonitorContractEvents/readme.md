# Monitor contract events

- contract.on

In **ethers.js**, the contract object has a **contract.on** monitoring method, which allows us to continuously monitor contract events:
```
contract.on("eventName", function)
```

**contract.on** has 2 parameters, one is the name of the event to be monitored, **\"eventName\"**, which needs to be included in the contract abi; the other is the function we call when the event occurs.

## contract.once

The contract object has a **contract.once** monitoring method, which allows us to monitor the contract release event only once. Its parameters are the same as **contract.on**:
```
contract.once("eventName", function)
```

## Monitoring USDT contracts

1. Declare **provider**: **Alchemy** is a free ETH node provider. You need to apply for one first, which will be used later. Apply for Alchemy API [alchemy.com](https://www.alchemy.com/)
   <br>
   ![applyAlchemyAPI](https://github.com/wls503pl/Ethers/blob/main/MonitorContractEvents/img/applyAlchemyAPI.png)<br>

```
import { ethers } from "ethers";

// prepare Alchemy API
const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/2Pc6Ms3EX5OoAN9maUcmdhYkME-NAja6'

// connect to main-net provider
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL)
```

2. Declare contract variables: We only care about the Transfer event of the USDT contract, so we can fill it into the abi. If you care about other functions and events, you can find them on [etherscan](https://etherscan.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7#code)

```
// USDT's contract address
const contractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'

// Constructing USDT's Transfer ABI
const abi = [
    "event Transfer(address indexed from, address indexed to, uint value)" 
];

// Generate USDT contract object
const contractUSDT = new ethers.Contract(contractAddress, abi, provider)
```

3. Use the ***contract.once()*** function to listen to the Transfer event once and print the result.

```
// only listening once
console.log("\n1. use contract.once() to listening Transfer event once")
contractUSDT.once('Transfer', (from, to, value) => {
   // print result
   console.log(
      `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value), 6)}`)
})
```
<br>
![listeningOnce](https://github.com/wls503pl/Ethers/blob/main/MonitorContractEvents/img/listeningOnce.png)<br>

4. Use the ***contract.on()*** function to continuously monitor the Transfer event and print the result.

```
// continuously listening USDT's contract
console.log("\n2. use contract.on() to listening Transfer event continuously")
contractUSDT.on('Transfer', (from, to, value) => {
   // print result
   console.log(
      `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value), 6)}`)
})
```
<br>
![continuouslyListening](https://github.com/wls503pl/Ethers/blob/main/MonitorContractEvents/img/continuouslyListening.png)
