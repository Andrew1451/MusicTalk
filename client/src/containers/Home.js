import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Post from '../components/Post';
import classes from './Home.module.css';

const Home = props => {
    const [post, setPost] = useState('');

    const placeholderPosts = [
        {
            id: 1, 
            username: 'LooneyTunes', 
            post: 'I think we can all agree that music is amazing'
        },
        {
            id: 2, 
            username: 'OfficialMozart', 
            post: 'I really am the official Mozart. I\'m not making this up. I\'m definitely alive'
        },
        {
            id: 3, 
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
            console.log(res.data);
            setPost('');
        })
        .catch(err => console.log(err));
    }

    return (
        <div className={classes.HomePage}>
            <form onSubmit={submitHandler}>
                <textarea id='post' rows='5' cols='40' placeholder='Write a post about music :)' onChange={inputChangedHandler}></textarea>
                <button type='submit' className={classes.PostButton}>Post</button>
            </form>
            <hr/>
            <ul>
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