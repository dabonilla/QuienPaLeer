import React, { useState } from 'react';

const usePaginationHook = (posts)=>{

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6)
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost)

    const changeCurrentPage = (number)=>{
        setCurrentPage(number)

    }
    return{
        currentPage,
        postsPerPage,
        currentPost,
        changeCurrentPage
    }
}
export default usePaginationHook