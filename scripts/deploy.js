// imports
// different from what we did using ethers in the other project, as hardhat wraps `ethers` inside their own package
// we're going to import `ethers` from `hardhat` 
// if you look inside the `package.json` you'll see the package `@nomiclabs/hardhat-ethers`
const { ethers } = require("hardhat")

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

  console.log("Deploying contract...")
  const simpleStorage = await SimpleStorageFactory.deploy()
  
  //to make sure we wait till it's deployed we can use the line below
  await simpleStorage.deployed()
  console.log(`Deployed contract to: ${simpleStorage.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })