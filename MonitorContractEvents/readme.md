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
   ![]()<br>

   
