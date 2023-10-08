import { ethers } from 'hardhat';
import { Library } from '../typechain';

const addBook = async () => {
  const library = await ethers.getContract<Library>('Library');

  const [admin] = await ethers.getSigners();

  const isbn = 12345;  // Replace with the desired ISBN
  const title = 'tutorial cepat kaya';
  const year = 2023;  // Replace with the desired year
  const author = 'Agera';

  const addBookTx = await library
    .connect(admin)
    .addBook(isbn, title, year, author);
  await addBookTx.wait();

  console.log('Book added successfully.');
};

addBook().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
