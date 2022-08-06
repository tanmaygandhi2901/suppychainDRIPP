const hre = require("hardhat");

async function main() {

  const Supplychain = await hre.ethers.getContractFactory("Supplychain");
  const supplychain = await Supplychain.deploy();

  await supplychain.deployed();

  console.log("Supplychain deployed to: ", supplychain.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
