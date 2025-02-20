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
