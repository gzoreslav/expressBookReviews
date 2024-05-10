const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    return res.send(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (!book) {
        return res.status(300).json({message: "Books not found"});
    }

    return res.send(book);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const booksArray = Object.values(books);
    const filteredBooks = booksArray.filter((book) => book.author.toLowerCase() === req.params.author.toLowerCase());
    return res.send(filteredBooks);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const booksArray = Object.values(books);
    const filteredBooks = booksArray.filter((book) => book.title === req.params.title);
    return res.send(filteredBooks);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (!book) {
        return res.status(300).json({message: "Books not found"});
    }

    return res.send(book.reviews);
});

module.exports.general = public_users;
