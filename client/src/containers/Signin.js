import React from 'react';
import classes from './Signup.module.css';

const Signin = props => {
    const signinSubmitHandler = e => {

    }

    const signinInputHandler = e => {

    }

    return (
        <div className={classes.FormContainer}>
            <form className={classes.Form} onSubmit={signinSubmitHandler}>
                <h3>SignIn</h3>
                <label htmlFor='username'>Username</label>
                <input type='text' id='signinUsername' required onChange={signinInputHandler} />
                <label htmlFor='password'>Password</label>
                <input type='text' id='signinPassword' required onChange={signinInputHandler} />
                <div className={classes.Buttons}>
                    <button type='button'>Cancel</button>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Signin