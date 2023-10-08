import { ethers } from 'hardhat';
import { Library } from '../typechain';

async function setAdmin() {
  const library = await ethers.getContract<Library>('Library');

  const [admin] = await ethers.getSigners();

  // Replace with the new admin address
  const newAdminAddress = '0x5B34BCfA3De28101DC85A5071Fa3d0E28AF8c326';

  const setAdminTx = await library.connect(admin).setAdmin(newAdminAddress);
  await setAdminTx.wait();

  console.log('Admin updated successfully.');
}

setAdmin().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
