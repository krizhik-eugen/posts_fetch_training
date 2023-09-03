import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {PostsService} from '../API/PostsService';
import useFetching from '../hooks/useFetching';
import MyLoader from './UI/Loader/MyLoader';

const PostItemContent = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])

    const [fetchPostById, isLoading, error] = useFetching(async () => {
        const response = await PostsService.getPostById(params.id)
        setPost(response.data)
    })
    const [fetchPostComments, isCommentsLoading, commmentsError] = useFetching(async () => {
        const response = await PostsService.getPostCommentsById(params.id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById()
        fetchPostComments()
    }, [])

    return (
        <div>
            {error && <div>{error}</div>}
            {commmentsError && <div>{commmentsError}</div>}
            {isLoading || isCommentsLoading ?
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><MyLoader/></div>
                :
                <>
                    <div>
                        <div>Post id: {post?.id}</div>
                        <div>Post title: {post?.title}</div>
                        <div>Post content: {post?.body}</div>
                    </div>
                    <>{comments.map(comment =>
                        <div key={comment.id}>
                            <div>Name: {comment?.name}</div>
                            <div>Email: {comment?.email}</div>
                            <div>Comment content: {comment?.body}</div>
                        </div>
                    )}</>
                </>
            }
        </div>)
};

export default PostItemContent;