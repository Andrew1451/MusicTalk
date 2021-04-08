import React, { useState } from 'react';
import axios from 'axios';
import classes from '../containers/Profile.module.css';

const Post = props => {
    const [error, setError] = useState(null);
    const likePost = async () => {
        try {
            await axios.post(`/${props.user}/like`, {postId: props.postid})
            props.liked = true;
            setError(null);
        } catch (err) {
            setError('Couldn\'t like post :(')
        }
    }
    return (
        <li className={classes.PostContainer}>
            <div className={classes.PostName}>
                <p>{props.username}</p>
            </div>
            <div className={classes.Post}>
                <p>{props.post}</p>
            </div>
            <div className={classes.LikeComment}>
                {props.liked ? <div style={{color: 'green'}}>Liked!</div> : <div onClick={likePost}>Like</div>}
                <div style={{borderRight: 'none'}}>Comment</div>
            </div>
            {error ? <p>{error}</p> : null}
        </li>
    )
}

export default Post;