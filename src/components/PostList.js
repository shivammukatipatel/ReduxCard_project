// src/components/PostList.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, removePost, changePage } from "../redux/postsSlice";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const currentPage = useSelector((state) => state.posts.currentPage);
  const status = useSelector((state) => state.posts.status);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const postsPerPage = 6;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const handleRemove = (id) => {
    dispatch(removePost(id));
    if (currentPosts.length === 1 && currentPage > 1) {
      dispatch(changePage(currentPage - 1));
    }
  };

  const handlePageChange = (page) => dispatch(changePage(page));

  // Determine the range of page numbers to display
  const getPageNumbers = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage === 1) {
      return [1, 2, 3];
    } else if (currentPage === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [currentPage - 1, currentPage, currentPage + 1];
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(changePage(currentPage + 1));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(changePage(currentPage - 1));
    }
  };

  return (
    <div className="container mx-auto p-4">
      {status === "loading" ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {currentPosts.map((post) => (
              <div key={post.id} className="p-4 bg-white rounded shadow">
              <div className="flex justify-between items-start mb-2">
                <h2 className="font-semibold text-xl">{post.title}</h2>
                <button
                  className="text-red-500 text-4xl "
                  onClick={() => handleRemove(post.id)}
                >
                  &times; 
                </button>
              </div>
              <div>
                <img
                  src={`https://picsum.photos/id/${post.id}/200/150`}
                  alt="Placeholder"
                  className="w-full h-40 object-cover rounded"
                />
                <p className="text-gray-700 mt-2">{post.body}</p>
              </div>
            </div>
            
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="flex space-x-2">
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  className={`px-3 py-1 rounded ${
                    page === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostList;
