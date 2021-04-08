import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Post from '../components/Post';
import classes from './Home.module.css';

const Home = props => {
    useEffect(() => {
        const source = axios.CancelToken.source();
        if (props.state.user) {
            axios.get(`/${props.state.user}/all-posts`, {cancelToken: source.token})
            .then(res => {
                let postsArray = [];
                res.data.allPosts.forEach(post => postsArray.push(post));
                setPosts(postsArray);
                setError(null);
            })
            .catch(err => setError('Had trouble grabbing posts =/'))
        }
        return () => {
            source.cancel();
        };
    }, [props.state.user])
    const [post, setPost] = useState('');
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    const placeholderPosts = [
        {
            id: 'a', 
            username: 'LooneyTunes', 
            post: 'I think we can all agree that music is amazing'
        },
        {
            id: 'b', 
            username: 'OfficialMozart', 
            post: 'I really am the official Mozart. I\'m not making this up. I\'m definitely alive.'
        },
        {
            id: 'c', 
            username: 'addictedtomusicc', 
            post: 'Music - vocal or instrumental sounds combined in such a way as to produce beauty of form, harmony, and expression of emotion.'
        }
    ];

    const inputChangedHandler = e => {
        setPost(e.target.value)
    }

    const submitHandler = e => {
        e.preventDefault()
        axios.post(`/${props.state.user}/add-post`, {post})
        .then(res => {
            setPosts([...posts, {post: post, post_id: res.data.insertId, username: props.state.user, liked: false}])
            setPost('')
            setError(null)
        })
        .catch(err => setError('Couldn\'t submit post =/. Try again?'));
    }

    if (!props.state.user) {
        return (
            <div className={classes.WelcomePage}>
                <h1><span>M</span>usic<span>T</span>alk</h1>
                <ul>
                    <li>An app similar to Facebook, but it's all about <span>music</span>.</li>
                    <li>Make posts and follow friends to see their posts.</li>
                    <li>No ads, no politics, and it's <span>free</span>.</li>
                </ul>
                <p><NavLink to={'/sign-up'}>SignUp!</NavLink> or <NavLink to={'/sign-in'}>SignIn!</NavLink></p>
            </div>
        )
    }

    return (
        <div className={classes.HomePage}>
            <form onSubmit={submitHandler}>
                <textarea id='post' rows='5' cols='40' placeholder='Write a post about music :)' value={post} onChange={inputChangedHandler}></textarea>
                <button type='submit' className={classes.PostButton}>Post</button>
            </form>
            <hr/>
            <p className={classes.Error}>{error}</p>
            <ul>
                {posts.map(post => {
                    return <Post key={post.post_id} 
                                postid={post.post_id} 
                                post={post.post} 
                                username={post.username} 
                                user={props.state.user} 
                                liked={post.liked} />
                })}
                {placeholderPosts.map(post => {
                    return <Post key={post.id} id={post.id} username={post.username} post={post.post} />
                })}
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        state
    }
}

export default connect(mapStateToProps)(Home);