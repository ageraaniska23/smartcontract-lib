import { ethers } from 'hardhat';
import { Library } from '../typechain';

async function updateBook() {
  const library = await ethers.getContract<Library>('Library');

  const [admin] = await ethers.getSigners();

  const updateBookTx = await library.connect(admin).updateBook();
  await updateBookTx.wait();

  console.log('Book updated successfully.');
}

updateBook().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
