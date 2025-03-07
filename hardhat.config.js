require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {}, // Local network
    goerli: {
      url: "YOUR_ALCHEMY_OR_INFURA_URL", // Replace with the Alchemy/Infura URL
      accounts: [ d7d490af84d247ae836524f514611da3 ] // Replace with the wallet's private key
    }
  }
};