import React, { useState } from 'react';
import axios from 'axios';
import classes from './Signup.module.css';

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
        axios.post('/sign-up', {
            username: username,
            password: password
        })
    }

    return (
        <div className={classes.FormContainer}>
            <form className={classes.Form} onSubmit={submitHandler}>
                <h3>SignUp</h3>
                <label htmlFor='username'>Username</label>
                <input id='username' type='text' value={formInputs.username} onChange={inputChangeHandler} />
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' value={formInputs.password} onChange={inputChangeHandler} />
                <div className={classes.Buttons}>
                    <button type='button'>Cancel</button>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Signup