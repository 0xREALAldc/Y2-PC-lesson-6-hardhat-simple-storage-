import { ethers } from "hardhat"
import { expect, assert } from "chai"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"

// to start we're going to define our test, `name` and a `function`
describe("SimpleStorage", function () {
  // we will declare the variables outside the `beforeEach()` so we have access in the `it()` 
  let simpleStorageFactory: SimpleStorage__factory
  let simpleStorage: SimpleStorage
  
  // inside each `describe` that we declare, we're going to have a `beforeEach()`
  beforeEach(async function() {
    // we're going to deploy our contract before each of `it()` runs, this means we'll have a brand new contract for each one
    simpleStorageFactory = (await ethers.getContractFactory("SimpleStorage")) as SimpleStorage__factory
    simpleStorage = await simpleStorageFactory.deploy()
  })

  // and after the `beforeEach()` a bunch of `it()` 
  // 'Description', then a 'function' to validate
  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"

    // now we're going to validate 
    assert.equal(currentValue.toString(), expectedValue)

    // we can see also the above validation done with 'expect', is all the same
    // expect(currentValue.toString()).to.equal(expectedValue)
  })

  it("Should update when we call store", async function () {
    const expectedValue = "67"
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)

    const currentValue = await simpleStorage.retrieve()

    assert.equal(currentValue.toString(), expectedValue)
  })

  // 'it.only(..)' if we use the keyword '.only' it will only run the tests that have this keyword
  it("Should add a person", async function () {
    const expectedValue = "13,John"
    
    const transactionResponse = await simpleStorage.addPerson("John", 13)
    await transactionResponse.wait(1)

    const actualValue = await simpleStorage.people(0)

    assert.equal(expectedValue, actualValue.toString())
  })

})