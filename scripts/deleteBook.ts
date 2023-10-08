import { ethers } from 'hardhat';
import { Library } from '../typechain';

async function deleteBookByISBN(isbn: number) {
  const library = await ethers.getContract<Library>('Library');

  const [admin] = await ethers.getSigners();

  const deleteBookTx = await library.connect(admin).deleteBook(isbn);
  await deleteBookTx.wait();

  console.log('Book with ISBN', isbn.toString(), 'deleted successfully.');
}

// Replace with the desired ISBN to delete
const isbnToDelete = 12345;

deleteBookByISBN(isbnToDelete).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
