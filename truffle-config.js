const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config(
  { path: "./.env" }
)
const Mnemonic = process.env.MNEMONIC;
const AccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      port: 7545,
      host: "127.0.0.1",
      network_id: "*"
    },
    ganache_local: {
      provider: function () {
        return new HDWalletProvider(Mnemonic, "http://127.0.0.1:7545", AccountIndex);
      },
      network_id: 5777
    },
    goerli_infura: {
      provider: function () {
        return new HDWalletProvider(Mnemonic, "https://goerli.infura.io/v3/edeb94352aeb43fdbc5c412bbb4bc341", AccountIndex);
      },
      network_id: 5
    },
    ropsten_infura: {
      provider: function () {
        return new HDWalletProvider(Mnemonic, "https://ropsten.infura.io/v3/edeb94352aeb43fdbc5c412bbb4bc341", AccountIndex);
      },
      network_id: 3
    }
  },
  compilers: {
    solc: {
      version: "0.6.4"
    }
  }
};