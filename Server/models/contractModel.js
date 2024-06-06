

const { ethers } = require('ethers');
const cAbi = require("../artifacts/contracts/VotingSystem.sol/VotingSystem.json");

// Connect to the local Ganache node
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');

// Set up the wallet and contract
const privateKey = '455c4ea3ed26b44f594dfbcacf2eded5055342d06c11695a6d86bcdd1e13d155';
const wallet = new ethers.Wallet(privateKey, provider);

const contractAddress = '0x784DcDA3fc160B624bb237e1B87da1a1B5987228'; // Replace with your contract address
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
