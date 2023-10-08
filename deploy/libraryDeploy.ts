import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async ({
  deployments,
  ethers,
}: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments;
  const accounts = await ethers.getSigners();

  // Print deployer's address
  const deployer = accounts[0];
  console.log('Deployer address:', deployer.address);

  // Deploy Library contract
  const library = await deploy('Library', {
    contract: 'Library',
    from: deployer.address,
    args: [],
    gasLimit: 1000000,
  });
  console.log('librar deployed at ', library.address);
}
func.tags = ['Library'];

export default func;


