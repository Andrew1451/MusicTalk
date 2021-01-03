import React from 'react';
import classes from './Friends.module.css';

const Friends = props => {
    const placeholderFriends = ['MusicMan', 'LooneyTunes', 'MajorMinor', 'guitarguy', 'OfficialMozart', 'iLoveMusic']
    return (
        <div className={classes.FriendsPage}>
            <h1>Your Friends</h1>
            <button type='button' className={classes.FindFriends}>Find Friends</button>
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

export default Friends;