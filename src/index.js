const express = require('express');

var bodyParser = require('body-parser');

const route = require('./route/route.js');

var multer = require('multer') // HERE

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any()) // HERE



const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://Satyaveer1994:Satyaveer123@cluster0.pn1nk.mongodb.net/DB?authSource=admin&replicaSet=atlas-knoi39-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", { useNewUrlParser: true })
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

app.use('/', route);




app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});