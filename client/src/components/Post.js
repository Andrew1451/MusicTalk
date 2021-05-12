import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import classes from '../containers/Profile.module.css';

const Post = props => {
    
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