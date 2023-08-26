import React from 'react';
import PostItem from './PostItem';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const PostsList = ({title, posts, removePost}) => {
    if (!posts.length) {
        return <h1 style={{textAlign: 'center'}}>Posts are not found</h1>
    }
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{title}</h1>
            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItem post={post} number={index + 1}
                                  removePost={removePost}/>
                    </CSSTransition>)}
            </TransitionGroup>
        </div>
    );
};

export default PostsList;