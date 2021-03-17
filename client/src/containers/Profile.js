import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import classes from './Profile.module.css';
import Post from '../components/Post';
import * as actions from '../store/actions/index';

const initialState = {
    friends: [],
}

const reducer = (state, action) => {
    if (action.type === 'fetchFriends') {
        return {
            ...state,
            friends: []
        }
    }
    if (action.type === 'updateFriends') {
        const updatedFriends = [...state.friends];
        action.friends.forEach(friend => {
            updatedFriends.push(friend.friend);
        })
        updatedFriends.splice(6);
        return {
            ...state,
            friends: [...state.friends, ...updatedFriends]
        }
    } else {
        throw new Error();
    }
}

const Profile = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (props.state.redirectTo === '/profile') {
            props.onLogin();
        }
    });
    useEffect(() => {
        dispatch({type: 'fetchFriends'})
        axios.get('/your-friends', {params: {user: props.state.user}})
        .then(res => {
            dispatch({type: 'updateFriends', friends: res.data})
        }).catch(err => console.log(err));
    }, [props.state.user]);
    useEffect(() => {
        axios.get(`/${props.state.user}/posts`)
        .then(res => {
            let postsArray = [];
            res.data.posts.forEach(post => {postsArray.push(post)});
            setPosts(postsArray);
        })
        .catch(err => console.log(err))
    }, [props.state.user])

    const [posts, setPosts] = useState([]);
    
    return (
        <div className={classes.Profile}>
            <h2>Hi, {props.state.user}!</h2>
            <section>
                <h3>Friends</h3>
                <div className={classes.FriendsList}>
                    {/* display friends or Find Friends button */}
                    {state.friends.length > 0 ? state.friends.map((friend, i) => {
                        return <NavLink to={`/friend/${friend}`} className={classes.Friend} key={i}>{friend}</NavLink>
                    }) : <div className={classes.Links}><NavLink to={'/find-friends'}>Find Friends</NavLink></div>}
                </div>
                <div className={classes.Links}>
                    <NavLink to={'/friends'}>View Friends</NavLink>
                    <NavLink to={'/find-friends'}>Find Friends</NavLink>
                </div>
            </section>
            <section>
                <h3>Posts</h3>
                <ul>
                    {posts.length > 0 ? posts.map(post => {
                        return <Post key={post.created_at} post={post.post} username={props.state.user} />
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
        state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: () => dispatch(actions.login())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);