require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const MY_PRIVATE_KEY = "YOUR Private Key";
module.exports = {
  solidity: "0.8.4",
  networks: {
    binanceTest: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      accounts: [`0x${MY_PRIVATE_KEY}`],
    },
  },
};
