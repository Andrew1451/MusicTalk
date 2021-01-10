import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Friends.module.css';

const Friends = props => {
    const placeholderFriends = ['MusicMan', 'LooneyTunes', 'MajorMinor', 'guitarguy', 'OfficialMozart', 'iLoveMusic']
    return (
        <div className={classes.FriendsPage}>
            <h1>Your Friends</h1>
            <NavLink to='/find-friends' className={classes.FindFriends}>Find Friends</NavLink>
            <hr></hr>
            <input type='text' placeholder='Search Friends'></input>
            <button type='button' className={classes.SearchButton}>Search</button>
            <ul>
            {placeholderFriends.map((username, i) => {
               return <li key={i}><NavLink to={`/friend/${username}`}>{username}</NavLink></li> 
            })}
            </ul>
        </div>
    )
}

export default Friends;