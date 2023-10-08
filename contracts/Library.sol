// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

contract Library {
    address public admin;
    
    struct Book {
        uint256 isbn;
        string title;
        uint16 year;
        string author;
    }
    
    mapping(uint256 => Book) public books;
    uint256 public bookList;
    bool public isBookUpdatePending;
    Book public pendingBookData;
    
    event BookAdded(uint256 isbn, string title, uint16 year, string author);
    event BookDeleted(uint256 isbn);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }
    
    constructor() {
        admin = msg.sender;
    }

    function setAdmin(address _admin) public {
        require(msg.sender == admin, "Only current admin can set a new admin");
        admin = _admin;
    }

    function addBook(uint256 _isbn, string memory _title, uint16 _year, string memory _author) public onlyAdmin {
        require(_isbn > 0, "Invalid ISBN code");
        pendingBookData = Book({
            isbn: _isbn,
            title: _title,
            year: _year,
            author: _author
        });
        isBookUpdatePending = true;
    }

    function updateBook() public onlyAdmin {
        require(isBookUpdatePending, "No pending book data to update");
        books[pendingBookData.isbn] = pendingBookData;
        bookList++;
        pendingBookData = Book({
            isbn: 0,
            title: "",
            year: 0,
            author: ""
        });
        isBookUpdatePending = false;
        emit BookAdded(pendingBookData.isbn, pendingBookData.title, pendingBookData.year, pendingBookData.author);
    }

    function deleteBook(uint256 _isbn) public onlyAdmin {
        require(books[_isbn].isbn != 0, "Book with specified ISBN not found");
        delete books[_isbn];
        bookList--;
        emit BookDeleted(_isbn);
    }

    function getBook(uint256 _isbn) public view returns (Book memory) {
        require(books[_isbn].isbn != 0, "Book with specified ISBN not found");
        return books[_isbn];
    }
}
