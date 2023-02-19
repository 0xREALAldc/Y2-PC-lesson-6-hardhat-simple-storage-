require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")

/** @type import('hardhat/config').HardhatUserConfig */

// we can add the environment variables in const variables to leave the code more clean 
// and also so we can put a default value if we forget to define the values of them in the .env file
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://eth-goerli"
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY || "0xKey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [GOERLI_PRIVATE_KEY],
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
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true, // this is because when output to a file, it get's all mess up
    currency: "USD", // we can get the cost for each function in USD 
    coinmarketcap: COINMARKETCAP_API_KEY,
    // token: "AVAX"
  }
};
