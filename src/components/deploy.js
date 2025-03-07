const hre = require("hardhat");

async function main() {
  const MedicalAppointment = await hre.ethers.getContractFactory("MedicalAppointment");
  const medicalAppointment = await MedicalAppointment.deploy();
  
  await medicalAppointment.deployed();

  console.log(`MedicalAppointment contract deployed to: ${medicalAppointment.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});