const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const port          = process.env.PORT || 5000;
const mysql         = require('mysql');
const cors          = require('cors');
const session       = require('express-session');
const bcrypt        = require('bcrypt');

require('dotenv').config();
app.use(cors());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: process.env.DATABASE_PASSWORD,
    database: 'MusicTalkDatabase'
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SHH,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
const saltRounds = 10;



app.listen(port, () => {
    console.log(`server running on port: ${port}`);
})