require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/block-number")
require("hardhat-gas-reporter")

/** @type import('hardhat/config').HardhatUserConfig */


module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      accounts: [process.env.GOERLI_PRIVATE_KEY],
      chainId: 5,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      // accounts: , // we don't need to explicitly define the accounts, because when we run hardhart it'l give us the accounts
      chainId: 31337, // even being considered different from the `default hardhat network` the chainId is the same
    }
  },
  solidity: "0.8.7",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
  }
};
