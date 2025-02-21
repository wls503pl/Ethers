import { ethers } from "ethers";

// 1. BigNumber
console.group('\n1. BigNumber Class')

const oneGwei = ethers.getBigInt("1000000000")      // generated from decimal string
console.log(oneGwei)
console.log(ethers.getBigInt("0x3b9aca00"))         // generated from hex string
console.log(ethers.getBigInt(1000000000))           // generated from number

console.log("The maximum safe integer in js: ", Number.MAX_SAFE_INTEGER)

// Calculation
console.log("Addition: ", oneGwei + 1n)
console.log("Subtraction: ", oneGwei - 1n)
console.log("Multiplication: ", oneGwei * 2n)
console.log("Division: ", oneGwei / 2n)

// Comparison
console.log("Are they equal? ", oneGwei == 1000000000n)

// 2. Formatting: Convert small units to large units
// For example, convert wei to ether: formatUnits(variable, unit): number of unit digits (number) or specified unit (string)
console.group('\n2. Formatting: small units to large units, formatUnits')
// '1000000000'
console.log(ethers.formatUnits(oneGwei, 0))

// '1.0'
console.log(ethers.formatUnits(oneGwei, "gwei"))

// '1.0'
console.log(ethers.formatUnits(oneGwei, 9))

// '0.000000001'
console.log(ethers.formatUnits(1000000000, "ether"))
node 
// '1.0'
console.log(ethers.formatUnits(1000000000, "gwei"));

// '0.000000001' equals to formatUnits(value, "ether")
console.log(ethers.formatEther(oneGwei))

console.groupEnd()

// 3. Parse: Big unit to small unit
// For example, convert ether to wei: parseUnits(variable, unit), the default unit of parseUnits is ether
console.group('\n3. Parse: Convert large units to small units, parseUnits')
// { BigNumber: "1000000000000000000" }
console.log(ethers.parseUnits("1.0").toString())
// { BigNumber: "1000000000000000000" }
console.log(ethers.parseUnits("1.0", "ether").toString());
// { BigNumber: "1000000000000000000" }
console.log(ethers.parseUnits("1.0", 18).toString());
// { BigNumber: "1000000000" }
console.log(ethers.parseUnits("1.0", "gwei").toString());
// { BigNumber: "1000000000" }
console.log(ethers.parseUnits("1.0", 9).toString());
// { BigNumber: "1000000000000000000" } is equivalent to parseUnits(value, "ether")
console.log(ethers.parseEther("1.0").toString());

console.groupEnd();
