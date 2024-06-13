

const { ethers } = require('ethers');
const cAbi = require("../artifacts/contracts/VotingSystem.sol/VotingSystem.json");

// Connect to the local Ganache node
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');

// Set up the wallet and contract
const privateKey = '747b7d5a9ee9ef419dba1e0e5d94aa3faac4582dbae9238d3d45b621837944ec';
const wallet = new ethers.Wallet(privateKey, provider);

const contractAddress = '0xfF2b6d9f92Cc8cf7F3AaA9581628657eA43ca569'; // Replace with your contract address
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
