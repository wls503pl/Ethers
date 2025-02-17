# ethers.js

ethers.js is a complete and compact open source library for interacting with the Ethereum blockchain and its ecosystem. If you want to write the front end of a Dapp, you need to use ethers.js.
Compared with the earlier web3.js, it has the following advantages:
1. The code is more compact: ethers.js is 116.5 kB, while web3.js is 590.6 kB.
2. More secure: Web3.js assumes that users will deploy Ethereum nodes locally, and private keys and network connection status are managed by this node (this is not actually the case).
   In ethers.js, the Provider class manages the network connection status, and the Wallet class manages the keys, which is secure and flexible.
3. Native support for ENS.
<br>
![]()<br>

