import React from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';

const PostForm = ({createPost}) => {

    const [post, setPost] = React.useState({title: '', body: ''})
    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {...post, id: Date.now()}
        createPost(newPost)
        setPost({title: '', body: ''})
    }
    return (
        <form>
            <MyInput
                type="text"
                placeholder='Post title'
                value={post.title}
                onChange={(e) => {
                    setPost(prevState => ({...prevState, title: e.target.value}))

                }}/>
            <MyInput
                type="text"
                placeholder='Post description'
                value={post.body}
                onChange={(e) => {
                    setPost(prevState => ({...prevState, body: e.target.value}))

                }}/>
            <MyButton onClick={addNewPost}>Add post</MyButton>
        </form>
    );
};

export default PostForm;