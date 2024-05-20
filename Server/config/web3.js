require('dotenv').config();
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

const abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../abi.json'), 'utf-8'));
const contractAddress = process.env.CONTRACT_ADDRESS;

const contract = new web3.eth.Contract(abi, contractAddress);

const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
const adminAccount = web3.eth.accounts.privateKeyToAccount(adminPrivateKey);
web3.eth.accounts.wallet.add(adminAccount);

module.exports = { web3, contract, adminAccount };
