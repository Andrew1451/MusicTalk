import { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import classes from '../containers/Profile.module.css';

const Post = props => {

    const [comment, setComment] = useState('');

    const inputHandler = e => setComment(e.target.value)

    const checkForEnter = e => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            setComment('');
            e.preventDefault();
        }
    }
    
    return (
        <>
            <li className={classes.PostContainer}>
                <div className={classes.PostName}>
                    <p>{props.username}</p>
                </div>
                <div className={classes.Post}>
                    <p>{props.post}</p>
                </div>
                <div className={classes.LikeComment}>
                    {props.liked ? <div style={{color: 'lime'}}>Liked!</div> : <div onClick={() => props.onLikePost(props.user, props.postid)}>Like</div>}
                    <div style={{borderRight: 'none'}}>Comment</div>
                </div>
                <div className={classes.Comment} >
                    <textarea  placeholder='Write a comment' onKeyDown={checkForEnter} value={comment} onChange={inputHandler} />
                    <button>Submit</button>
                </div>
            </li>
            {props.likeErr ? <p className={classes.LikeError}>{props.likeErr}</p> : null}
        </>
    )
}

const mapStateToProps = state => {
    return {
        postErr: state.posts.postsError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLikePost: (user, postid) => dispatch(actions.likePost(user, postid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);