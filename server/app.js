const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
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

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SHH,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
const saltRounds = 10;

app.post('/sign-up', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        db.query(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hashedPassword], (err, result) => {
                if (err) {
                    res.send({error: err})
                } else {
                    res.cookie('user', username, {maxAge: 60 * 60 * 24 * 30});
                    res.send({username: username});
                }
            }
        )
    })
})

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query("SELECT * FROM users WHERE username = ?",
    [username], (err, result) => {
        if (!result[0]) {
            res.send({err: 'username doesn\'t exist :('})
        } else {
            bcrypt.compare(password, result[0].password, (err, match) => {
                if (match) {
                    res.cookie('user', username, {maxAge: 60 * 60 * 24 * 30});
                    res.send({username});
                } else {
                    res.send({err: 'wrong password :('})
                }
            })
        }
    })
})

app.get('/find-friends', (req, res) => {
    const username = req.query.user;
    db.query("SELECT u.username FROM users u LEFT JOIN friends f ON u.user_id = f.user WHERE u.username NOT IN (SELECT f.friend FROM users u JOIN friends f ON u.user_id = f.user WHERE u.username = ?) AND u.username != ?", 
    [username, username], (err, result) => {
        if (result) {
            res.send(result);
        }
        if (err) {
            console.log(err)
            res.send({err: 'Error occured :('});
        }
    })
})

app.get('/your-friends', (req, res) => {
    const username = req.query.user;
    db.query("SELECT f.friend FROM friends f WHERE user = (SELECT u.user_id FROM users u WHERE username = ?)", 
    [username], (err, result) => {
        if (result) {
            res.send(result)
        }
        if (err) {
            console.log(err)
        }
    })
})

app.post('/:id/add-friend', (req, res, next) => {
    const friend = req.body.username;
    const user = req.params.id;
    db.query("INSERT INTO friends (friend, user) VALUES (?, (SELECT user_id FROM users WHERE username = ?))",
    [friend, user], (err, result) => {
        if (err) {
            res.send({err: 'Couldn\'t add friend.. So lonely..'})
        }
        if (result) {
            res.send({added: 'friend added!'})
        }
    })
})

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
})