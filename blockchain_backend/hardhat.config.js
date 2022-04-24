/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require('dotenv').config();
 require("@nomiclabs/hardhat-ethers")
module.exports = {
  solidity: "0.8.1",
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/70BFPO5DVGnoRbOg_4IdQG9_szJjCp6S`,
      accounts: ['0xe334b1471167192cb4d34e5999cba6ffa36917cbb30b9a2ed0d3cde7070f0c50'],
    } 
  }
};
