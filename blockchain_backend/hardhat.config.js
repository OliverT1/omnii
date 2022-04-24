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
      accounts: [''],
    } 
  }
};
