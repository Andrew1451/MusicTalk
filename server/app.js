const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const port          = process.env.PORT || 5000;
const mysql         = require('mysql');
const cors          = require('cors');

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



app.listen(port, () => {
    console.log(`server running on port: ${port}`);
})