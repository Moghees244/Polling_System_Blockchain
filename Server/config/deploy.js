async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const VotingSystem = await ethers.getContractFactory("VotingSystem");
    const votingSystem = await VotingSystem.deploy();
  
    console.log("VotingSystem contract address:", votingSystem.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
  