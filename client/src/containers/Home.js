import React, { useState, useEffect } from 'react';
import * as actions from '../store/actions/index';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Post from '../components/Post';
import classes from './Home.module.css';

const Home = ({ user, onFetchAllPosts, onSubmitPost, allPosts, err }) => {
    useEffect(() => {
        if (user) {
            onFetchAllPosts(user)
        }
    }, [user, onFetchAllPosts])

    const [post, setPost] = useState('');

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
        onSubmitPost(user, post)
        setPost('')
    }

    if (!user) {
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
                <textarea className={classes.HomeTextArea} id='post' rows='5' cols='40' placeholder='Write a post about music :)' value={post} onChange={inputChangedHandler}></textarea>
                <button type='submit' className={classes.PostButton}>Post</button>
            </form>
            <hr/>
            { err && <p className={classes.Err}>{err}</p> }
            <ul>
                {allPosts.map(post => {
                    return <Post key={post.post_id} 
                                postid={post.post_id} 
                                post={post.post} 
                                username={post.username} 
                                user={user} 
                                likeErr={post.likeError}
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
        user: state.auth.user,
        allPosts: state.posts.allPosts,
        err: state.posts.postsError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAllPosts: (user) => dispatch(actions.fetchAllPosts(user)),
        onSubmitPost: (user, post) => dispatch(actions.submitPost(user, post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);