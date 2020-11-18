import React from 'react';
import classes from './Signup.module.css';

const Signup = props => {
    

    const inputHandler = e => {

    }

    const submitHandler = e => {

    }

    return (
        <div className={classes.FormContainer}>
            <form className={classes.Form} onSubmit={submitHandler}>
                <h3><span>S</span>ign<span>U</span>p</h3>
                <label htmlFor='username'>Username</label>
                <input id='username' type='text' onChange={inputHandler} />
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' onChange={inputHandler} />
                <div className={classes.Buttons}>
                    <button type='button'>Cancel</button>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Signup