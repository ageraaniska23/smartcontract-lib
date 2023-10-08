import { HardhatUserConfig } from "hardhat/config";
import dotenv from "dotenv";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "hardhat-deploy";
import "hardhat-contract-sizer";
import "hardhat-prettier";
import "hardhat-deploy-ethers"

dotenv.config() 
const{
  MNEMONIC
}= process.env



const config: HardhatUserConfig = {
  solidity:{
    compilers:[
      {
        version: "0.8.13",
        settings:{
          optimizer:{
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
  defaultNetwork: "hardhat",
  networks:{
    hardhat:{
      chainId: 11337,
      accounts:{
        mnemonic: MNEMONIC,
        accountsBalance:"1000000000000000000000"
      }
    },
  },

  // ganache: {
  //   chainId: 5777,
  //   url: 'http://127.0.0.1:7545',
  //   accounts: {
  //     mnemonic: MNEMONIC_GANACHE,
  //   }
  // },

  paths:{
    deployments: './deploymens',
  },
  contractSizer:{
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  typechain: {
    outDir: './typechain',
    target: 'ethers-v6',
  },
};

export default config;
