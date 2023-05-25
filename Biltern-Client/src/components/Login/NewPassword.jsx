import React, { useState } from 'react'
import { setTimedAlert } from '../../features/alertSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { changePasswordAsync } from '../../features/authSlice';

import classes from './ChangePassword.module.css';

/**
 * @author Faruk Uçgun
 * @date 05.05.2023
 */

const ChangePassword = () => {
    
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const studentId = searchParams.get('id');

    const [password, setPassword] = useState('');

    const passwordChangeHandler = (event) => { setPassword(event.target.value); }

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(changePasswordAsync({studentId, password, token}));
        navigate('/login');
        setPassword('');
    }

    return (
        <div className={classes.changePass_container}>
            <h1>BILTERN</h1>
            <h3>Change Password</h3>
            <form action="" onSubmit={submitHandler} className={classes.changePass_form}>
                <input 
                    value={password}
                    type="password" 
                    id="password" 
                    placeholder="New Password"
                    onChange={passwordChangeHandler}
                    className={classes.input}
                />
                <button type='submit' className={classes.submit}>Change Password</button>
            </form>
        </div>
    );
}

export default ChangePassword;