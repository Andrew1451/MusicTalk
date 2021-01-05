import React from 'react';
import classes from '../containers/Profile.module.css';

const Post = props => {
    return (
        <li key={props.id} className={classes.PostContainer}>
            <div className={classes.PostName}>
                <p>{props.username}</p>
            </div>
            <div className={classes.Post}>
                <p>{props.post}</p>
            </div>
            <div className={classes.LikeComment}>
                <div>Like</div>
                <div style={{borderRight: 'none'}}>Comment</div>
            </div>
        </li>
    )
}

export default Post;