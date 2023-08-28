import React from 'react';
import About from '../pages/About';
import Posts from '../pages/Pages';
import PostItemContent from '../components/PostItemContent';
import Error from '../pages/Error';
import Login from '../components/Login';


export const privateRouter = [
    {path: '/about', component: <About/>},
    {path: '/posts', component: <Posts/>},
    {path: '/posts/:id', component: <PostItemContent/>},
    {path: '/404', component: <Error/>},
]

export const publicRouter = [
    {path: '/login', component: <Login/>},
]