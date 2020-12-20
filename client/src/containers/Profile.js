import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './Profile.css';
import * as actions from '../store/actions/index';

const Profile = ({state, onLogin}) => {
    useEffect(() => {
        if (state.redirectTo === '/profile') {
            onLogin();
        }
    })

    return (
        <div>
            <h3>Hi, {state.user}!</h3>
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