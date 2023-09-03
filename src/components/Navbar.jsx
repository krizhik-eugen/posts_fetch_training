import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import MyButton from './UI/button/MyButton';
import {AuthContext} from '../context/context';

const Navbar = () => {
    const {setIsAuthenticated} = useContext(AuthContext)
    const logout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className='navbar'>
            <MyButton onClick={logout}>Log out</MyButton>
            <div className='navbar__links'>
                <Link to='/about' className='link'>About this app</Link>
                <Link to='/posts' className='link'>Posts</Link>
            </div>
        </div>
    );
};

export default Navbar;