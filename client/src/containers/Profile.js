import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import classes from './Profile.module.css';
import * as actions from '../store/actions/index';

const Profile = ({state, onLogin}) => {
    useEffect(() => {
        if (state.redirectTo === '/profile') {
            onLogin();
        }
    })

    const placeholderFriends = ['MusicMan', 'LooneyTunes', 'MajorMinor', 'guitarguy', 'OfficialMozart', 'iLoveMusic']

    return (
        <div className={classes.Profile}>
            <h2>Hi, {state.user}!</h2>
            <section>
                <h3>Friends</h3>
                {/* <hr></hr> */}
                <div className={classes.FriendsList}>
                    {placeholderFriends.map((friend, i) => {
                        return <p className={classes.Friend} key={i}>{friend}</p>
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
                        <p>{state.user}</p>
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