import { useState } from 'react';
import { connect } from 'react-redux';
import Comment from './Comment';
import * as actions from '../store/actions/index';
import classes from '../containers/Profile.module.css';

const Post = ({postid, user, onComment, onFetchComments, comments, ...props}) => {

    const [comment, setComment] = useState('');
    const [toggleComments, setToggleComments] = useState(false);

    const commentsHandler = (user, postid) => {
        if (!toggleComments) {
            onFetchComments(user, postid)
            setToggleComments(true)
            return
        }
        if (toggleComments) {
            setToggleComments(false)
        }
    }

    const inputHandler = e => setComment(e.target.value)

    const submitComment = e => {
        e.preventDefault()
        onComment(user, postid, comment)
        setComment('')
    }

    const checkForEnter = e => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            submitComment(e)
            setComment('');
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
                    {props.liked ? <div style={{color: 'lime'}}>Liked!</div> : <div onClick={() => props.onLikePost(user, postid)}>Like</div>}
                    <div style={{borderRight: 'none'}} onClick={() => commentsHandler(user, postid)}>Comments</div>
                </div>
                <div className={`${classes.Comment} ${toggleComments ? classes.Open : classes.Close}`} >
                    <form onSubmit={submitComment} style={{margin: '0'}}>
                        <textarea  placeholder='Write a comment' onKeyDown={checkForEnter} value={comment} onChange={inputHandler} autoComplete='on' />
                        <button type='submit'>Submit</button>
                    </form>
                    {props.commentErr && <p className={classes.CommentErr}>{props.commentErr}</p> }
                    {props.fetchCommentErr && <p className={classes.CommentErr}>{props.fetchCommentErr}</p>}
                </div>
                {/* comments are an array of objects */}
                {comments && comments.map(({comments}) => ( //destructure each comment object and grab the array of comments
                    comments.map(comment => {  //map over the array of comments
                        if (comment.post === postid && toggleComments) {
                            return <Comment key={comment.comment_id} comment={comment.comment} username={comment.username} />
                        }
                        return null
                    })
                ))}
            </li>
            {props.likeErr ? <p className={classes.LikeError}>{props.likeErr}</p> : null}
        </>
    )
}

const mapStateToProps = state => {
    return {
        postErr: state.posts.postsError,
        comments: state.comments.comments,
        commentErr: state.comments.commentError,
        fetchCommentsErr: state.comments.fetchCommentsError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLikePost: (user, postid) => dispatch(actions.likePost(user, postid)),
        onComment: (user, postid, comment) => dispatch(actions.comment(user, postid, comment)),
        onFetchComments: (user, postid) => dispatch(actions.fetchComments(user, postid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);