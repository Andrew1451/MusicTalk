import classes from './Comment.module.css';

const Comment = ({username, comment, ...props}) => {

    return (
        <div className={classes.Comment}>
            <h3>{username}</h3>
            <p>{comment}</p>
        </div>
    )
}

export default Comment;