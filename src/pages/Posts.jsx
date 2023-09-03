import React, {useEffect, useRef, useState} from 'react';
import '../styles/App.css'
import PostsList from '../components/PostsList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PositFilter';
import MyModal from '../components/UI/modal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import {usePosts} from '../hooks/usePosts';
import {PostsService} from '../API/PostsService';
import MyLoader from '../components/UI/Loader/MyLoader';
import useFetching from '../hooks/useFetching';
import {getPagesCount} from '../utils/pages';
import {usePagination} from '../hooks/usePagination';
import MyPagination from '../components/UI/pagination/MyPagination';
import UseObserver from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';


function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', search: ''})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [totalPagesCount, setTotalPagesCount] = useState(0)
    const [limit, setLimit] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const scrollObserverElement = useRef(null)

    const [fetchPosts, isLoading, error] = useFetching(async () => {
        const response = await PostsService.getAll(limit, currentPage)
        const totalPostsCount = response.headers['x-total-count']
        setTotalPagesCount(getPagesCount(totalPostsCount, limit))
        setPosts([...posts, ...response.data])
    })

    const observerCallback = () => setCurrentPage(page => page + 1)
    const isLoadable = currentPage < totalPagesCount
    UseObserver(scrollObserverElement, isLoadable, isLoading, observerCallback)

    useEffect(() => {
        fetchPosts()
    }, [currentPage, limit])

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

    const pageLimitOptions = [
        {value: 5, name: '5'},
        {value: 10, name: '10'},
        {value: 20, name: '20'},
        {value: -1, name: 'all'},
    ]

    return (
        <div className="App">
            <MyButton onClick={() => setIsModalOpen(true)}>Create new post</MyButton>
            <MyModal visible={isModalOpen} setVisible={setIsModalOpen}>
                <PostForm createPost={createPost}/>
            </MyModal>
            <hr style={{margin: '10px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <MySelect options={pageLimitOptions} defaultValue='Elements per page' value={limit}
                      onChange={(e) => setLimit(e.currentTarget.value)}/>
            {error && <div>{error}</div>}
            <PostsList title='Posts list JS' posts={searchedPosts} removePost={removePost}/>
            {isLoading && <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><MyLoader/></div>}
            <MyPagination
                totalPages={pagesArray}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <div ref={scrollObserverElement}/>
        </div>
    );
}

export default Posts;
