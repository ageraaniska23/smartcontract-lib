import { ethers } from 'hardhat';
import { Library } from '../typechain';
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';

describe('Library Contract', () => {
  let library: Library;
  let admin: HardhatEthersSigner;
  let notAdmin: HardhatEthersSigner;

  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    admin = accounts[0];
    notAdmin = accounts[1];
    library = await (await ethers.getContractFactory('Library')).connect(admin).deploy();
  });

  it('should set admin correctly', async () => {
    const newAdminAddress = await notAdmin.getAddress();
    await library.connect(admin).setAdmin(newAdminAddress);
    const currentAdmin = await library.admin();
    expect(currentAdmin).to.equal(newAdminAddress);
  });

  it('should add a book', async () => {
    await library.connect(admin).addBook(12345, 'tutorial cepat kaya', 2023, 'Agera');
  });


  it('should update a book', async () => {
    await library.connect(admin).addBook(12345, 'tutorial cepat kaya', 2023, 'Agera');
    await library.connect(admin).isBookUpdatePending();
    const newTitle = 'Updated Title';
    await library.connect(admin).addBook(12345, newTitle, 2023, 'Agera');
    await library.connect(admin).updateBook();
    const updatedBook = await library.connect(admin).getBook(12345);
    expect(updatedBook.title).to.equal(newTitle);
  });

  it('should delete a book', async () => {
    await library.connect(admin).addBook(12345, 'tutorial cepat kaya', 2023, 'Agera');
    let error: any;
    try {
      await library.connect(admin).deleteBook(12345);
    } catch (e) {
      error = e as any;
    }
    expect(error.message).to.include('Book with specified ISBN not found');
  });
});
