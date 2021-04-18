import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../store/actions/index';
import classes from './Signup.module.css';

const Signin = props => {
    const [signin, setSignin] = useState({
        signinUsername: '',
        signinPassword: ''
    })

    const signinSubmitHandler = e => {
        e.preventDefault();
        const username = signin.signinUsername;
        const password = signin.signinPassword;
        props.onSignin(username, password);
    }

    const signinInputHandler = e => {
        const updatedInputs = {
            ...signin,
            [e.target.id]: e.target.value
        }
        setSignin(updatedInputs);
    }

    if (props.state.redirectTo) {
        return <Redirect push to={props.state.redirectTo} />
    }

    let errorMessage;

    if (props.state.error) {
        errorMessage = props.state.error;
    }

    return (
        <div className={classes.FormContainer}>
            <form className={classes.Form} onSubmit={signinSubmitHandler}>
                <h3>SignIn</h3>
                <label htmlFor='username'>Username</label>
                <input type='text' id='signinUsername' required onChange={signinInputHandler} />
                <label htmlFor='password'>Password</label>
                <input type='password' id='signinPassword' required onChange={signinInputHandler} />
                <div className={classes.Buttons}>
                    <button type='button'>Cancel</button>
                    <button type='submit'>Submit</button>
                </div>
                <p className={classes.Error}>{errorMessage}</p>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        state: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignin: (username, password) => dispatch(actions.signin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)