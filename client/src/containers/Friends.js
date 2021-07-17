import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './Friends.module.css';

const Friends = props => {
    useEffect(() => {
        axios.get('https://music-talk.herokuapp.com/your-friends', {params: {user: props.state.user}})
        .then(res => {
            let friendsArray = [];
            res.data.forEach(friend => friendsArray.push(friend.friend));
            setFriends(friendsArray);
            setError('')
        }).catch(err => setError('Couldn\'t fetch friends :('))
    }, [props.state.user])
    const [friends, setFriends] = useState([]);
    const [error, setError] = useState('');
    return (
        <div className={classes.FriendsPage}>
            <h1>Your Friends</h1>
            <NavLink to='/find-friends' className={classes.FindFriends}>Find Friends</NavLink>
            <div className={classes.Filter}>
                <hr></hr>
                <input type='text' placeholder='Search Friends'></input>
                <button type='button' className={classes.SearchButton}>Search</button>
            </div>
            <p className={classes.Err}>{error}</p>
            <ul>
            {friends.map((username, i) => {
               return <li key={i}><NavLink to={`/friend/${username}`}>{username}</NavLink></li> 
            })}
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        state: state.auth
    }
}

export default connect(mapStateToProps)(Friends);