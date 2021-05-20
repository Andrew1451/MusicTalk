import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import classes from './Profile.module.css';
import Post from '../components/Post';
import * as actions from '../store/actions/index';

const Profile = ({onFetchUserPosts, posts, ...props}) => {
    const [friends, setFriends] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (props.state.redirectTo === '/profile') {
            props.onLogin();
        }
    });
    useEffect(() => {
        axios.get('/your-friends', {params: {user: props.state.user}})
        .then(res => {
            const updatedFriends = [];
            res.data.forEach(friend => {
            updatedFriends.push(friend.friend);
            })
            updatedFriends.splice(6);
            setFriends(updatedFriends);
            setError(null)
        }).catch(err => setError(`Couldn't get friends =/`));
        onFetchUserPosts(props.state.user);
    }, [props.state.user, onFetchUserPosts]);
 
    return (
        <div className={classes.Profile}>
            <h2>Hi, {props.state.user}!</h2>
            <section>
                <h3>Friends</h3>
                <div className={classes.FriendsList}>
                    {/* display friends or Find Friends button */}
                    {friends.length > 0 ? friends.map((friend, i) => {
                        return <NavLink to={`/friend/${friend}`} className={classes.Friend} key={i}>{friend}</NavLink>
                    }) : <div className={classes.Links}><NavLink to={'/find-friends'}>Find Friends</NavLink></div>}
                    {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}
                </div>
                <div className={classes.Links}>
                    <NavLink to={'/friends'}>View Friends</NavLink>
                    <NavLink to={'/find-friends'}>Find Friends</NavLink>
                </div>
            </section>
            <section>
                <h3>Your Posts</h3>
                <ul>
                    {posts.userPosts.length > 0 ? posts.userPosts.map(post => {
                        return <Post key={post.created_at} 
                                    postid={post.post_id} 
                                    post={post.post} 
                                    user={props.state.user} 
                                    username={props.state.user}
                                    liked={post.liked} />
                    }) : <ul className={classes.CreatePost}>
                            <li><p>You have no posts.</p></li>
                            <li><p><NavLink to={'/'}>Create one</NavLink></p></li>
                         </ul>}
                </ul>
            </section>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        state: state.auth,
        posts: state.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: () => dispatch(actions.login()),
        onFetchUserPosts: (user) => dispatch(actions.fetchUserPosts(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);