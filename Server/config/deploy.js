require('dotenv').config();
const {Web3} = require('web3');
const fs = require('fs');
const path = require('path');

// Load environment variables
const infuraUrl = process.env.INFURA_URL;
const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY;

console.log(infuraUrl)
console.log(deployerPrivateKey)

// Initialize Web3 instance
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

// Add deployer's private key to the wallet
const deployerAccount = web3.eth.accounts.privateKeyToAccount(deployerPrivateKey);
web3.eth.accounts.wallet.add(deployerAccount);

// Read smart contract ABI and bytecode
const abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'abi.json'), 'utf-8'));
const bytecode = fs.readFileSync(path.resolve(__dirname, 'bytecode.txt'), 'utf-8');

async function deployContract() {
    // Create contract instance
    const contract = new web3.eth.Contract(abi);

    // Define deployment transaction
    const deployTransaction = contract.deploy({
        data: bytecode
    });

    // Estimate gas
    const gasEstimate = await deployTransaction.estimateGas();

    // Send deployment transaction
    const receipt = await deployTransaction.send({
        from: deployerAccount.address,
        gas: gasEstimate
    });

    console.log('Contract deployed at address:', receipt.options.address);
}

deployContract().catch(console.error);
