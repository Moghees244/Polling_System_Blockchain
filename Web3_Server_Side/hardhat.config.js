require('@nomiclabs/hardhat-waffle');
const { task } = require("hardhat/config");

// Replace with your actual private key
const PRIVATE_KEY = 'fd9daab0ddf770a76d7266845b9ae2529c4c22ef08977d2128712e65b4bff866';

module.exports = {
  solidity: "0.8.0",
  networks: {
    ganache: {
      url: 'http://127.0.0.1:7545',
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
