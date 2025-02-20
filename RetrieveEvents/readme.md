# Abstract

This topic introduces how to use **ethers.js** to read events emitted by smart contracts.

## Event

Events emitted by smart contracts are stored in the log of the Ethereum virtual machine(EVM). The log is divided into two parts: **topics** and **data**.
The **event hash** and **indexed variables** are stored in topics as indexes for easy searching later. No **indexed** variables are stored in data and cannot be retrieved directly, but more complex data structures can be stored.

Take the **Transfer** event in the **ERC20** token as an example. It is declared in the contract as follows:
```
event Transfer(address indexed from, address indexed to, uint256 amount);
```
It records a total of 3 variables: **from**, **to** and **amount**, which correspond to the token's sending address, receiving address and transfer amount respectively.
The from and to fields are preceded by the indexed keyword. When transferring money, the Transfer event will be recorded and can be found in etherscan.<br>

![ethereumSearchEvent](https://github.com/wls503pl/Ethers/blob/main/RetrieveEvents/img/ethereumSearchEvent.png)<br>

It can be seen from the above figure, the Transfer event is recorded in the EVM log, where Topics contains three data, corresponding to the event hash, the sending address from, and the receiving address to;
and Data contains one data, corresponding to the transfer amount amount.

## Retrieve Events

We can use the ***queryFilter()*** function of the contract type in **Ethers** to read the events released by the contract.

```
const transferEvents = await contract.queryFilter('Event name', Starting block， Ending block)
```

***queryFilter()*** contains 3 parameters, Event name(**Required**), Starting block(**Optional**), Ending block(**Optional**). The search results will be returned in an array.

**Note**: The events to be retrieved must be included in the contract's abi.

## Example: Retrieve the Transfer event in the WETH contract

1. Create **provider**.
```
import { ethers } from "ethers";

// use Alchemy's rpc node to connect ethereum network
const ALCHEMY_GOERLI_URL = 'https://eth-goerli.alchemyapi.io/v2/GlaeWuylnNM3uuOo-SAwJxuwTdqHaY5l';
const provider = new ethers.JsonRpcProvider(ALCHEMY_GOERLI_URL);
```

2. Create an abi containing the retrieval events.
```
const abiWETH = [
  "event Transfer(address indexed from, address indexed to, uint amount)"
];
```

3. Declare WETH contract instance.
```
// WETH address of Testnet
const addressWETH = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'
// Declare contract instance
const contract = new ethers.Contract(addressWETH, abiWETH, provider)
```

4. Get the Transfer events in the past 10 blocks and print out 1.
```
// get current block
const block = await provider.getBlockNumber()
console.log(`Current block height: ${block}`)
console.log(`Print event details:`)
const transferEvents = await contract.queryFilter('Transfer', block - 10, block)
// print the 1st Transfer Event
console.log(transferEvents[0])
```
<br>
![1stTransferEvent](https://github.com/wls503pl/Ethers/blob/main/RetrieveEvents/img/1stTransferEvent.png)<br>

5. Read the parsed result of the event.
```
// Parse the data of the Transfer event (variables in args)
console.log("\n2. Parse Event：")
const amount = ethers.formatUnits(ethers.getBigInt(transferEvents[0].args["amount"]), "ether")
console.log(`address ${transferEvents[0].args["from"]} transfer${amount} WETH to address ${transferEvents[0].args["to"]}`)
```

## Summarize

We reviewed events in Solidity and introduced how to retrieve events released by smart contracts using ethers. One thing to note: the events to be retrieved must be included in the contract abi.
