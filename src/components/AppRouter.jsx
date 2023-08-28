import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {privateRouter, publicRouter} from '../router/router';

const AppRouter = () => {

    const isAuthenticated = true

    return (
        <Routes>
            {isAuthenticated ?
                privateRouter.map(route =>
                    <>
                        <Route path={route.path} element={route.component}/>
                        <Route path='*' element={<Navigate to='/posts'/>}/>
                    </>
                )
                :
                publicRouter.map(route =>
                    <>
                        <Route path={route.path} element={route.component}/>
                        <Route path='*' element={<Navigate to='/login'/>}/>
                    </>
                )}
            <Route path='*' element={<Navigate to='/404'/>}/>
        </Routes>
    );
};

export default AppRouter;