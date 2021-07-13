import React, { useState } from 'react';
import * as actions from '../store/actions/index';
import { connect } from 'react-redux';
import classes from './Signup.module.css';
import { Redirect } from 'react-router-dom';

const Signup = props => {
    const [formInputs, setFormInputs] = useState({
        username: '',
        password: ''
    })

    const inputChangeHandler = e => {
        const updatedInput = {
            ...formInputs,
            [e.target.id]: e.target.value
        }
        setFormInputs(updatedInput);
    }

    const submitHandler = e => {
        e.preventDefault();
        const username = formInputs.username;
        const password = formInputs.password;
        props.onSignup(username, password);
    }

    const cancelHandler = () => {
        const clearForm = {
            ...formInputs,
            username: '',
            password: ''
        }
        setFormInputs(clearForm);
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
            <form className={classes.Form} onSubmit={submitHandler}>
                <h3>SignUp</h3>
                <label htmlFor='username'>Username</label>
                <input id='username' type='text' value={formInputs.username} onChange={inputChangeHandler} required />
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' value={formInputs.password} onChange={inputChangeHandler} required />
                <div className={classes.Buttons}>
                    <button type='button' onClick={cancelHandler}>Cancel</button>
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
        onSignup: (username, password) => dispatch(actions.signup(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup) 