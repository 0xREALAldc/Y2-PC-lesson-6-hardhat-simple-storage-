// imports
// different from what we did using ethers in the other project, as hardhat wraps `ethers` inside their own package
// we're going to import `ethers` from `hardhat` 
// if you look inside the `package.json` you'll see the package `@nomiclabs/hardhat-ethers`
import { ethers, run, network } from "hardhat"

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

  console.log("Deploying contract...")
  const simpleStorage = await SimpleStorageFactory.deploy()
  
  //to make sure we wait till it's deployed we can use the line below
  await simpleStorage.deployed()
  console.log(`Deployed contract to: ${simpleStorage.address}`)

  // only verify the contract if we're running in GOERLI testnet and have a API key
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    // before running the verify function, we're going to set to wait the blockchain to mine a few blocks to make sure that 
    // the contract is already mined on the blockchain
    // we'll wait 6 blocks to be mined, then run the `verify` function
    await simpleStorage.deployTransaction.wait(6) 
    
    // since our verify function is `async` we're going to add the `await` key word
    await verify(simpleStorage.address, [])
  }

  const currentValue = await simpleStorage.retrieve()
  console.log(`Current value is: ${currentValue}`)

  // update the current value
  const transactionResponse = await simpleStorage.store(69)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Updated value is: ${updatedValue}`)

}

// args here would be `arguments` for our constructor, if and when we have them
// in our case here we don't have, so it'll be blank
async function verify(contractAddress: string, args: any[]) {
  
  // the "verify:verify" it's us describing the task and it's sub-task, that's going to be `verify`
  // the second parameter in the `run` is the actual parameters in a object
  try{
    await run("verify:verify", {
      address: contractAddress, 
      constructorArguments: args,
    })
  } catch(e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!")
    } else {
      console.log(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })