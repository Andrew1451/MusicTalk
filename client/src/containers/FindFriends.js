import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import classes from './Friends.module.css';

const FindFriends = props => {
    useEffect(() => {
        axios.get('/find-friends', {params: {user: props.state.user}})
        .then(res => {
            let friendArray = [];
            if (res.data.err) {
                setError(res.data.err);
                return
            }
            res.data.forEach(friend => friendArray.push(friend.username));
            setFriends(friendArray);
            setError(null);
        })
        .catch(err => console.log(err));
    }, [props.state]);
    const [error, setError] = useState(null);
    const [added, setAdded] = useState([]);
    const [friends, setFriends] = useState([]);
    const addUser = (username, i) => {
        axios.post(`/${props.state.user}/add-friend`, {username})
        .then(res => {
            if (res.data.added) {
                setAdded([...added, i])
            }
        })
        .catch(err => console.log(err));
    }
    return (
        <div className={classes.FriendsPage}>
            <h1>Find Friends</h1>
            <NavLink to='/friends' className={classes.FindFriends}>Your Friends</NavLink>
            <hr></hr>
            <input type='text' placeholder='Search Friends'></input>
            <button type='button' className={classes.SearchButton}>Search</button>
            <ul>
            {friends.map((username, i) => {
                if (added.includes(i)) {
                    return <li style={{color: 'lime', cursor: 'default'}} key={i}>Added!</li>
                } else {
                    return <li key={i}  onClick={() => addUser(username, i)}>{username}</li>
                }
            })}
            </ul>
            { error ? <p className={classes.Error}>{error}</p> : null }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        state
    }
}

export default connect(mapStateToProps)(FindFriends);