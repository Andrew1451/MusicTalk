const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const port          = process.env.PORT || 5000;
const mysql         = require('mysql');
const cors          = require('cors');
const session       = require('cookie-session');
const bcrypt        = require('bcrypt');
const path          = require('path');

require('dotenv').config();

app.use(cors());

// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: process.env.DATABASE_PASSWORD,
//     database: 'MusicTalk',
// })

const db = mysql.createPool({
    user: process.env.DBU,
    host: process.env.DBH,
    password: process.env.DBP,
    database: process.env.DBN,
})

app.use(express.static(path.join(__dirname, 'build')));
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

app.post('/sign-up', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            next(err)
        }
        db.query(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hashedPassword], (err, result) => {
                if (err) {
                    next(err)
                } else {
                    res.cookie('user', username, {maxAge: 60 * 60 * 24 * 30});
                    res.send({username: username});
                }
            }
        )
    })
})

app.post('/signin', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query("SELECT * FROM users WHERE username = ?",
    [username], (err, result) => {
        if (err) {
            res.send({err: 'wrong username :('})
            next(err)
        }
        else {
            bcrypt.compare(password, result[0].password, (err, match) => {
                if (match) {
                    res.cookie('user', username, {maxAge: 60 * 60 * 24 * 30});
                    res.send({username});
                } 
                if (!match) {
                    res.send({err: 'wrong password :('})
                    next(err)
                }
            })
        }
    })
})

app.get('/find-friends', (req, res, next) => {
    const username = req.query.user;
    db.query("SELECT u.username FROM users u WHERE u.username NOT IN (SELECT f.friend FROM friends f WHERE user = (SELECT u.user_id FROM users u WHERE username = ?)) AND u.username != ?", 
    [username, username], (err, result) => {
        if (result) {
            res.send(result);
        }
        if (err) {
            next(err)
        }
    })
})

app.get('/your-friends', (req, res, next) => {
    const username = req.query.user;
    db.query("SELECT f.friend FROM friends f WHERE user = (SELECT u.user_id FROM users u WHERE username = ?)", 
    [username], (err, result) => {
        if (result) {
            res.send(result)
        }
        if (err) {
            next(err)
        }
    })
})

app.post('/:id/add-friend', (req, res, next) => {
    const friend = req.body.username;
    const user = req.params.id;
    db.query("INSERT INTO friends (friend, user) VALUES (?, (SELECT user_id FROM users WHERE username = ?))",
    [friend, user], (err, result) => {
        if (err) {
            next(err)
        }
        if (result) {
            res.send({added: 'friend added!'})
        }
    })
})

app.post('/:id/add-post', (req, res, next) => {
    const post = req.body.post;
    const user = req.params.id;
    db.query("INSERT INTO posts (post, post_author) values (?, (SELECT user_id FROM users WHERE username = ?))",
    [post, user], (err, result) => {
        if (err) {
            next(err)
        }
        if (result) {
            res.send({result})
        }
    })
})

app.get('/:id/posts', (req, res, next) => {
    const user = req.params.id;
    db.query("SELECT post, post_id, created_at FROM posts WHERE post_author = (SELECT user_id FROM users WHERE username = ?) ORDER BY created_at DESC",
    [user], (err, result) => {
        if (err) {
            next(err)
        }
        if (result) {
            const posts = result;
            db.query("SELECT liked_post FROM likes WHERE user_id = (SELECT user_id FROM users WHERE username = ?)",
            [user], (err, result) => {
                if (err) {
                    next(err)
                }
                if (result) {
                    const likes = result.map(like => like['liked_post'])
                    posts.forEach(post => {
                        likes.includes(post.post_id) ? post['liked'] = true : post['liked'] = false;
                    })
                    res.send({posts})
                }
            }
        )}
    })
})

app.get('/:id/all-posts', (req, res, next) => {
    const user = req.params.id;
    db.query(`SELECT p.post, p.post_author, p.created_at, p.post_id, u.username FROM posts p 
        INNER JOIN users u ON p.post_author = u.user_id WHERE p.post_author IN (
        SELECT u.user_id FROM users u WHERE u.username IN (SELECT f.friend FROM friends f WHERE f.user = (
        SELECT u.user_id FROM users u WHERE u.username = ?))) OR p.post_author = (
        SELECT u.user_id FROM users u WHERE username = ?) ORDER BY p.created_at DESC`, 
    [user, user], (err, result) => {
        if (err) {
            next(err)
        }
        if (result) {
            const allPosts = result;
            db.query("SELECT likes.liked_post FROM likes WHERE user_id = (SELECT u.user_id FROM users u WHERE username = ?)",
            [user], (err, result) => {
                if (err) {
                    next(err)
                }
                if (result) {
                    const likes = result.map(like => like['liked_post'])
                    allPosts.forEach(post => {
                        post['likeError'] = null;
                        likes.includes(post.post_id) ? post['liked'] = true : post['liked'] = false;
                    })
                    res.send({allPosts})
                }
            }
        )}
    })
})

app.post('/:id/like', (req, res, next) => {
    const postid = req.body.postId;
    const user = req.params.id;
    db.query("INSERT INTO likes (liked_post, user_id) VALUES (?, (SELECT user_id FROM users WHERE username = ?))",
    [postid, user], (err, result) => {
        if (err) {
            next(err)
        }
        if (result) {
            res.send({liked: true})
        }
    })
})

app.post('/:id/comment', (req, res, next) => {
    const user = req.params.id;
    const postid = req.body.postid;
    const comment = req.body.comment;
    db.query("INSERT INTO comments (comment, post, comment_author) VALUES (?, ?, (SELECT user_id FROM users WHERE username = ?))",
    [comment, postid, user], (err, result) => {
        if (err) {
            next(err)
        }
        if (result) {
            res.sendStatus(200)
        }
    })
})

app.get('/:id/comments/:postid', (req, res, next) => {
    const user = req.params.id;
    const postid = req.params.postid;
    db.query(`SELECT c.comment, c.comment_id, c.post, c.created_at, u.username FROM comments c 
    INNER JOIN users u ON c.comment_author = u.user_id INNER JOIN posts p ON p.post_id = c.post
    WHERE c.post = ? AND u.username IN (SELECT u.username FROM users u WHERE u.user_id = c.comment_author) 
    ORDER BY c.created_at ASC`, [postid], (err, result) => {
        if (err) {
            next(err)
        }
        if (result) {
            res.send(result)
        }
    })
})

app.listen(process.env.PORT || port, () => {
    console.log(`server running on port: ${port}`);
})