import { ethers } from 'hardhat';
import { Library } from '../typechain';

async function getBookByISBN(isbn: number) {
  const library = await ethers.getContract<Library>('Library');

  const book = await library.getBook(isbn);

  console.log('Book details for ISBN', isbn.toString());
  console.log('ISBN:', book.isbn.toString());
  console.log('Title:', book.title);
  console.log('Year:', book.year.toString());
  console.log('Author:', book.author);
}

// Replace with the desired ISBN
const isbnToRetrieve = 12345;

getBookByISBN(isbnToRetrieve).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
