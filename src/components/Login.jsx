import React, {useContext} from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';
import {AuthContext} from '../context/context';

const Login = () => {
    const {setIsAuthenticated} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsAuthenticated?.(true)
        localStorage.setItem('auth', 'true')
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login page</h1>
            <MyInput placeholder={'name'}/>
            <MyInput type='password' placeholder={'password]'}/>
            <MyButton>Login</MyButton>
        </form>
    );
};

export default Login;