import React from 'react';

export const useSortedPosts = (posts, sort) => {
    const sortedPosts = React.useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        } else {
            return posts
        }
    }, [sort, posts])
    return sortedPosts
}

export const usePosts = (posts, sort, search) => {
    const sortedPosts = useSortedPosts(posts, sort)
    const searchedPosts = React.useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
    }, [search, sortedPosts])
return searchedPosts
}