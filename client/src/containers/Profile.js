import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import classes from './Profile.module.css';
import * as actions from '../store/actions/index';

const initialState = {
    friends: [],
}

const reducer = (state, action) => {
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
        axios.get('/your-friends', {params: {user: props.state.user}})
        .then(res => {
            dispatch({type: 'updateFriends', friends: res.data})
        }).catch(err => console.log(err));
    }, [props.state.user]);
    
    return (
        <div className={classes.Profile}>
            <h2>Hi, {props.state.user}!</h2>
            <section>
                <h3>Friends</h3>
                <div className={classes.FriendsList}>
                    {state.friends.map((friend, i) => {
                        return <NavLink to={`/friend/${friend}`} className={classes.Friend} key={i}>{friend}</NavLink>
                    })}
                </div>
                <div className={classes.Buttons}>
                    <button type='button'>View Friends</button>
                    <button type='button'>Find Friends</button>
                </div>
            </section>
            <section>
                <h3>Posts</h3>
                <div className={classes.PostContainer}>
                    <div className={classes.PostName}>
                        <p>{props.state.user}</p>
                    </div>
                    <div className={classes.Post}>
                        <p>Music - vocal or instrumental sounds combined in such a way as to produce beauty of form, 
                            harmony, and expression of emotion.</p>
                    </div>
                    <div className={classes.LikeComment}>
                        <div>Like</div>
                        <div style={{borderRight: 'none'}}>Comment</div>
                    </div>
                </div>
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