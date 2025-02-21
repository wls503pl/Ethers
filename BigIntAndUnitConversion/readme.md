# Abstruct

This topic, we introduce **\"BigInt\"** class and Uint conversion.

- BigInt

In Ethereum, many calculations exceed the safe value of JavaScript integers (the maximum safe integer in js is 9007199254740991).
Therefore, ethers.js uses the native BigInt class of JavaScript ES2020 to safely perform mathematical operations on numbers of any order of magnitude.
In ethers.js, most operations that need to return a value will return a BigInt, and parameters that accept values ​​will also accept them.

## Creating a BigInt Instance

You can use ***ethers.getBigInt()*** function to convert string, number and other types to BigInt.
**Note** that values ​​exceeding the maximum safe integer of JS will not be converted.

```
const oneGwei = ethers.getBigInt("1000000000");      // generated from decimal string
console.log(oneGwei)
console.log(ethers.getBigInt("0x3b9aca00"))          // generated from hex string
console.log(ethers.getBigInt(1000000000))            // generated from number

// You cannot generate a BigNumber from a number other than the largest safe integer in js. The following code will report an error
// ethers.getBigInt(Number.MAX_SAFE_INTEGER);

console.log("The maximum safe integer in js: ", Number.MAX_SAFE_INTEGER)
```
<br>

![bigNumber](https://github.com/wls503pl/Ethers/blob/main/BigIntAndUnitConversion/img/bigNumber.png)

## BigInt Calculation

BigInt supports many operations, such as addition, subtraction, multiplication, division, modulus, power operation, absolute value, etc.<br>
**Notice**: Numeric values ​​with the suffix **\"n\"** will be automatically converted to **BigInt**.

```
// calculate
console.log("Addition: ", oneGwei + 1n)
console.log("Subtraction: ", oneGwei - 1n)
console.log("Multiplication: ", oneGwei * 2n)
console.log("Division: ", oneGwei / 2n)

// compare
console.log("If equalled: ", oneGwei == 1000000000n)
```

## Unit Conversion

In Ethereum, 1 ether is equal to 10^18 wei. Some commonly used units are listed below:
<br>
![generalUnit](https://github.com/wls503pl/Ethers/blob/main/BigIntAndUnitConversion/img/generalUnit.png)<br>

In applications, we often convert values ​​between human-readable strings (in ether) and machine-readable numbers (in wei). For example, a wallet can specify balances (in ether) and gas prices (in gwei) for the user interface,
but when sending a transaction, both must be converted to numbers in wei. ethers.js provides some functions to facilitate this kind of conversion.

- formatUnits(variable, unit): Format, convert small units to large units, such as \"wei -> ether\", which is useful when displaying balances. In the parameter, the unit is filled with digits (number) or the specified unit (string).

```
// Code reference: https://docs.ethers.org/v6/api/utils/#about-units
console.group('\n2. Formatting: Convert small units to large units, formatUnits')
console.log(ethers.formatUnits(oneGwei, 0))
// '1000000000'
console.log(ethers.formatUnits(oneGwei, "gwei"));
// '1.0'
console.log(ethers.formatUnits(oneGwei, 9));
// '1.0'
console.log(ethers.formatUnits(oneGwei, "ether"));
// `0.000000001`
console.log(ethers.formatUnits(1000000000, "gwei"));
// '1.0'
console.log(ethers.formatEther(oneGwei));
// `0.000000001` equals to formatUnits(value, "ether")
console.groupEnd();
```
<br>
![SmallToLargeNum](https://github.com/wls503pl/Ethers/blob/main/BigIntAndUnitConversion/img/SmallToLargeNum.png)<br>

- parseUnit: Parse, convert large units to small units, such as \"ether -> wei\", which is useful for converting user input values ​​to values ​​in wei. In the parameter, the unit is filled with digits (number) or the specified unit (string).

```
// Parse: Large unit to small unit
// For example, to convert ether to wei: parseUnits(variable, unit), the default unit of parseUnits is ether
// Code reference: https://docs.ethers.org/v6/api/utils/#about-units
console.group('\n3. Parsing: large units to small units, parseUnits')

// { BigNumber: "1000000000000000000" }
console.log(ethers.parseUnits("1.0").toString())

// { BigNumber: "1000000000000000000" }
console.log(ethers.parseUnits("1.0", "ether").toString())

// { BigNumber: "1000000000000000000" }
console.log(ethers.parseUnits("1.0", 18).toString())

// { BigNumber: "1000000000" }
console.log(ethers.parseUnits("1.0", "gwei").toString())

// { BigNumber: "1000000000" }
console.log(ethers.parseUnits("1.0", 9).toString())

// { BigNumber: "1000000000000000000" } equals to parseUnits(value, "ether")
console.groupEnd();
```
<br>
![LargeToSmallNum](https://github.com/wls503pl/Ethers/blob/main/BigIntAndUnitConversion/img/LargeToSmallNum.png)
