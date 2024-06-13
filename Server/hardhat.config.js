require('@nomiclabs/hardhat-waffle');
const { task } = require("hardhat/config");

// Replace with your actual private key
const PRIVATE_KEY = '747b7d5a9ee9ef419dba1e0e5d94aa3faac4582dbae9238d3d45b621837944ec';

module.exports = {
  solidity: "0.8.0",
  networks: {
    ganache: {
      url: 'http://127.0.0.1:7545',
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
