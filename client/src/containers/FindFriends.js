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
            res.data.forEach(friend => friendArray.push(friend.username));
            setFriends(friendArray);
        })
        .catch(err => console.log(err));
    }, [props.state])
    const [friends, setFriends] = useState([]);
    
    return (
        <div className={classes.FriendsPage}>
            <h1>Find Friends</h1>
            <NavLink to='/friends' className={classes.FindFriends}>Your Friends</NavLink>
            <hr></hr>
            <input type='text' placeholder='Search Friends'></input>
            <button type='button' className={classes.SearchButton}>Search</button>
            <ul>
            {friends.map((username, i) => {
                            // onClick={addUser(username)}
                return <li key={i} >{username}</li> 
            })}
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        state
    }
}

export default connect(mapStateToProps)(FindFriends);