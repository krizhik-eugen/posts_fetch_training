import React, {Fragment, useContext} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {privateRouter, publicRouter} from '../router/router';
import {AuthContext} from '../context/context';
import MyLoader from './UI/Loader/MyLoader';

const AppRouter = () => {
    const {isAuthenticated, isAppLoading} = useContext(AuthContext)

    if (isAppLoading) {
        return <MyLoader/>
    }

    return (
        <Routes>
            {isAuthenticated ?
                privateRouter.map(route =>
                    <Fragment key={route.path}>
                        <Route path={route.path} element={route.component}/>
                        <Route path='*' element={<Navigate to='/posts'/>}/>
                    </Fragment>
                )
                :
                publicRouter.map(route =>
                    <Fragment key={route.path}>
                        <Route path={route.path} element={route.component}/>
                        <Route path='*' element={<Navigate to='/login'/>}/>
                    </Fragment>
                )}
            <Route path='*' element={<Navigate to='/404'/>}/>
        </Routes>
    );
};

export default AppRouter;