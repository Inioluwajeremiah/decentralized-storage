
const hre = require("hardhat");

async function main() {

  const DecStorage  = await hre.ethers.getContractFactory("DecStorage");
  const decStorage = await DecStorage.deploy();
  await decStorage.deployed();

  console.log("DescStorage address => ", decStorage.address)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
