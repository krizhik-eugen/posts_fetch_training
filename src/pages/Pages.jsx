import React from 'react';
import '../styles/App.css'
import PostsList from '../components/PostsList';
import PostForm from '../components/PostForm';
import PositFilter from '../components/PositFilter';
import MyModal from '../components/UI/modal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import {usePosts} from '../hooks/usePosts';
import {PostsService} from '../API/PostsService';
import MyLoader from '../components/UI/Loader/MyLoader';
import useFetching from '../hooks/useFetching';
import {getPagesCount} from '../utils/pages';
import {usePagination} from '../hooks/usePagination';
import MyPagination from '../components/UI/pagination/MyPagination';

function Posts() {
    const [posts, setPosts] = React.useState([
        {id: 1, title: 'Javascript', body: 'Programming language'},
        {id: 2, title: 'React', body: 'UI library'},
        {id: 3, title: 'HTML', body: 'Browser document structure'},
        {id: 4, title: 'CSS', body: 'Styling'}
    ])
    const [filter, setFilter] = React.useState({sort: '', search: ''})
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [totalPagesCount, setTotalPagesCount] = React.useState(0)
    const [limit, setLimit] = React.useState(10)
    const [currentPage, setCurrentPage] = React.useState(1)

    const [fetchPosts, isLoading, error] = useFetching(async () => {
        const response = await PostsService.getAll(limit, currentPage)
        const totalPostsCount = response.headers['x-total-count']
        setTotalPagesCount(getPagesCount(totalPostsCount, limit))
        setPosts(response.data)
    })

    React.useEffect(() => {
        fetchPosts()
    }, [currentPage])

    const pagesArray = usePagination(totalPagesCount)

    const searchedPosts = usePosts(posts, filter.sort, filter.search)

    const createPost = (newPost) => {
        setPosts(prevState => [...prevState, newPost])
        setIsModalOpen(false)
    }

    const removePost = (postId) => {
        const updatedPosts = posts.filter(post => post.id !== postId)
        setPosts(updatedPosts)
    }

    return (
        <div className="App">
            <MyButton onClick={() => setIsModalOpen(true)}>Create new post</MyButton>
            <MyModal visible={isModalOpen} setVisible={setIsModalOpen}>
                <PostForm createPost={createPost}/>
            </MyModal>
            <hr style={{margin: '10px 0'}}/>
            <PositFilter filter={filter} setFilter={setFilter}/>
            {error && <div>{error}</div>}
            {isLoading ?
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><MyLoader/></div>
                :
                <>
                    <PostsList title='Posts list JS' posts={searchedPosts} removePost={removePost}/>
                    <MyPagination
                        totalPages={pagesArray}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            }
        </div>
    );
}

export default Posts;
