const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  const filtered = users.filter(userItem => userItem.username === username);
  return filtered.length !== 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
  if (!isValid(username)) {
    return false;
  }

  const filtered = users.filter(userItem => userItem.username === username);

  return filtered[0].password === password;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const user = req.body.user;
  if (!user) {
    return res.status(404).json({message: "Body is empty"});
  }

  if (!authenticatedUser(user.username, user.password)) {
    return res.status(300).json({message: "Invalid credentials"});
  }

  let accessToken = jwt.sign({
    data: user
  }, 'access', { expiresIn: 60 * 60 });

  req.session.authorization = {
    accessToken
  }

  return res.status(200).send({message: "User successfully logged in"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  console.log(req);
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
