const hre = require("hardhat");

async function main() {
  // Get the signer (deployer)
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);

  // Deploy the contract
  const Investment = await hre.ethers.getContractFactory("Investment");
  const investmentContract = await Investment.deploy();

  await investmentContract.deployed(); // Use `.deployed()` for Ethers v5

  console.log("Contract deployed at:", investmentContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
