import React from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';

const Login = () => {
    return (
        <div>
            <MyInput placeholder={'name'}/>
            <MyInput type='password' placeholder={'password]'}/>
            <MyButton>Login</MyButton>
        </div>
    );
};

export default Login;