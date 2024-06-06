require('@nomiclabs/hardhat-waffle');
const { task } = require("hardhat/config");

// Replace with your actual private key
const PRIVATE_KEY = '455c4ea3ed26b44f594dfbcacf2eded5055342d06c11695a6d86bcdd1e13d155';

module.exports = {
  solidity: "0.8.0",
  networks: {
    ganache: {
      url: 'http://127.0.0.1:7545',
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
