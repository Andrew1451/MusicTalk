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
    database: 'MusicTalk'
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
    db.query("SELECT u.username FROM users u WHERE u.username NOT IN (SELECT f.friend FROM friends f WHERE user = (SELECT u.user_id FROM users u WHERE username = ?)) AND u.username != ?", 
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
            res.send({err: 'Error occured :('})
        }
    })
})

app.post('/:id/add-friend', (req, res) => {
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

app.post('/:id/add-post', (req, res) => {
    const post = req.body.post;
    const user = req.params.id;
    db.query("INSERT INTO posts (post, post_author) values (?, (SELECT user_id FROM users WHERE username = ?))",
    [post, user], (err, result) => {
        if (err) {
            res.send({err: 'Houston? We have a problem..'})
        }
        if (result) {
            res.send({result})
        }
    })
})

app.get('/:id/posts', (req, res) => {
    const user = req.params.id;
    db.query("SELECT post, post_id, created_at FROM posts WHERE post_author = (SELECT user_id FROM users WHERE username = ?)",
    [user], (err, result) => {
        if (err) {
            res.send({postErr: 'Couldn\'t get posts =/'})
        }
        if (result) {
            const posts = result;
            db.query("SELECT liked_post FROM likes WHERE user_id = (SELECT user_id FROM users WHERE username = ?)",
            [user], (err, result) => {
                if (err) {
                    res.send({postErr: 'Couldn\'t get posts =/'})
                }
                if (result) {
                    posts.forEach(post => {
                        result.includes(post.post_id) ? post['liked'] = true : post['liked'] = false;
                    })
                    res.send({posts})
                }
            }
        )}
    })
})

app.get('/:id/all-posts', (req, res) => {
    const user = req.params.id;
    db.query("SELECT DISTINCT p.post, p.post_id, p.created_at, u.username FROM posts p INNER JOIN users u ON p.post_author = u.user_id INNER JOIN friends f ON p.post_author = f.user WHERE p.post_author IN (SELECT u.user_id FROM users u INNER JOIN friends f ON u.user_id = f.user WHERE f.friend IN (SELECT f.friend FROM friends f WHERE user = (SELECT u.user_id FROM users u WHERE username = ?)))", 
    [user], (err, result) => {
        if (err) {
            res.send({postsErr: 'Couldn\'t get posts =/'})
        }
        if (result) {
            const allPosts = result;
            db.query("SELECT liked_post FROM likes WHERE user_id = (SELECT user_id FROM users WHERE username = ?)",
            [user], (err, result) => {
                if (err) {
                    res.send({postsErr: 'Couldn\'t get posts =/'})
                }
                if (result) {
                    allPosts.forEach(post => {
                        result.includes(post.post_id) ? post['liked'] = true : post['liked'] = false;
                    })
                    res.send({allPosts})
                }
            }
        )}
    })
})

app.post('/:id/like', (req, res) => {
    const postid = req.body.postId;
    const user = req.params.id;
    db.query("INSERT INTO likes (liked_post, user_id) VALUES (?, (SELECT user_id FROM users WHERE username = ?))",
    [postid, user], (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result) {
            console.log(result);
            res.send({liked: true})
        }
    })
})

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
})