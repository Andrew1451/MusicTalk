import React from 'react';
import classes from '../containers/Profile.module.css';

const Post = props => {
    const likePost = () => {
        
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
                <div onClick={likePost}>Like</div>
                <div style={{borderRight: 'none'}}>Comment</div>
            </div>
        </li>
    )
}

export default Post;