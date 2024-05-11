const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const userName = req.body.username;
    const password = req.body.password;

    if (!password || !userName) {
        return res.status(300).json({message: "Username and password are required"});
    }

    const filtered = users.filter(userItem => userItem.username === userName);

    if (filtered.length > 0) {
        return res.status(300).json({message: "User exists"});
    }

    users.push({username: userName, password: password});

    res.send(users);
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    let getBooksPromise = new Promise((resolve, reject) => {
        resolve(books);
    });

    getBooksPromise.then(result => res.send(result));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    let getBookPromise = new Promise((resolve, reject) => {

        const isbn = req.params.isbn;
        const book = books[isbn];

        if (!book) {
            reject({message: "Book not found"});
        }

        return res.send(book);
    });

    getBookPromise
        .then(result => res.send(result))
        .catch(err => res.status(300).send(err));
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
