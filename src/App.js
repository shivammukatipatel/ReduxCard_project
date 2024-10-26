// src/App.js
import React from 'react';
import PostList from './components/PostList';

function App() {
  return (
    <div className="App">
      <h1 className="text-2xl font-bold text-center my-4">Posts</h1>
      <PostList />
    </div>
  );
}

export default App;
