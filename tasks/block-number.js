// get the current number in whatever blockchain we're in
// first we need to import the task function
const { task } = require("hardhat/config")

//to define a task we need to give a `name` and a `description`
task("block-number", "Prints the current block number")
  // setAction is WHAT the task will do
  .setAction(
    
    // `taskArgs` would be the arguments for the function
    // `hre` is the Hardhat Runtime Environment : is basically the same of the `require ("hardhat")` that's used inside the `deploy.js`
    //  this means that we have access to pretty much the same packages that we had in the `deploy.js` file

    async (taskArgs, hre) => { // anonymous function that is where we tell what to do
      // here with `hre` we have access to `ethers` to get the block number 
      const blockNumber = await hre.ethers.provider.getBlockNumber()
      console.log(`Current block number: ${blockNumber}`)
    }
)

module.exports = {}