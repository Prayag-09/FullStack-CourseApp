const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jwt');

const app = express();
app.use(express.json());

const secretCode = '';
const user = mongoose.Schema({
    username: String,
    password: String
});

const adminSchema = mongoose.Schema({
    Admin: String,
    Password: String 
});