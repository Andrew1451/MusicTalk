import React, { useState } from 'react';
import Post from '../components/Post';
import classes from './Home.module.css';

const Home = props => {
    const [post, setPost] = useState({
        post: ''
    })

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
        const updatedInput = {
            ...post,
            [e.target.id]: e.target.value
        }
        setPost(updatedInput);
    }

    const submitHandler = e => {
        e.preventDefault()
        //todo - put into database
    }

    return (
        <div className={classes.HomePage}>
            <form onSubmit={submitHandler}>
                <textarea id='post' rows='4' cols='40' placeholder='Led Zeppelin is so...' onChange={inputChangedHandler}></textarea>
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

export default Home;