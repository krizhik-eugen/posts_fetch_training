import React, {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import {AuthContext} from './context/context';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isAppLoading, setIsAppLoading] = useState(true)


    useEffect(() => {
        if(localStorage.getItem('auth')){
            setIsAuthenticated(true)
        }
        setIsAppLoading(false)
    }, []);

    return (
        <AuthContext.Provider value={
            {
                isAuthenticated,
                setIsAuthenticated,
                isAppLoading
            }}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>

        </AuthContext.Provider>

    );
};

export default App;