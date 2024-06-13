const { ethers } = require('ethers');
const cAbi = require("../artifacts/contracts/VotingSystem.sol/VotingSystem.json");

// Connect to the local Ganache node
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');

// Set up the wallet and contract
const privateKey = '2ab0bc1d00263a1a6881dd2906f0f94beee559697b54273cb0fe89f3b173d3fa';
const wallet = new ethers.Wallet(privateKey, provider);

const contractAddress = '0xf11eaC62200563dF0Ded5ddf6945Cc36eddAd249'; // Replace with your contract address
const contractABI = cAbi.abi;

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

module.exports = {
    createPoll: async (question, options) => {
        const tx = await contract.createPoll(question, options);
        const receipt = await tx.wait();
        return receipt;
    },
    vote: async (pollId, optionId) => {
        const tx = await contract.vote(pollId, optionId);
        const receipt = await tx.wait();
        return receipt;
    },
    endPoll: async (pollId) => {
        const tx = await contract.endPoll(pollId);
        const receipt = await tx.wait();
        return receipt;
    },
    viewPoll: async (pollId) => {
        const poll = await contract.viewPoll(pollId);
        return poll;
    },
    getResults: async (pollId) => {
        const results = await contract.getResults(pollId);
        return results;
    }
};