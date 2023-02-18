// imports
// different from what we did using ethers in the other project, as hardhat wraps `ethers` inside their own package
// we're going to import `ethers` from `hardhat` 
// if you look inside the `package.json` you'll see the package `@nomiclabs/hardhat-ethers`
const { ethers, run } = require("hardhat")

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

  console.log("Deploying contract...")
  const simpleStorage = await SimpleStorageFactory.deploy()
  
  //to make sure we wait till it's deployed we can use the line below
  await simpleStorage.deployed()
  console.log(`Deployed contract to: ${simpleStorage.address}`)
}

// args here would be `arguments` for our constructor, if and when we have them
// in our case here we don't have, so it'll be blank
async function verify(contractAddress, args) {
  
  // the "verify:verify" it's us describing the task and it's sub-task, that's going to be `verify`
  // the second parameter in the `run` is the actual parameters in a object
  try{
    await run("verify:verify", {
      address: contractAddress, 
      constructorArguments: args,
    })
  } catch(e) {
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