import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Friends.module.css';

const FindFriends = props => {
    const placeholderFriends = ['MusicMan', 'LooneyTunes', 'MajorMinor', 'guitarguy', 'OfficialMozart', 'iLoveMusic']
    return (
        <div className={classes.FriendsPage}>
            <h1>Find Friends</h1>
            <NavLink to='/friends' className={classes.FindFriends}>Your Friends</NavLink>
            <hr></hr>
            <input type='text' placeholder='Search Friends'></input>
            <button type='button' className={classes.SearchButton}>Search</button>
            <ul>
            {placeholderFriends.map((username, i) => {
               return <li key={i}>{username}</li> 
            })}
            </ul>
        </div>
    )
}

export default FindFriends