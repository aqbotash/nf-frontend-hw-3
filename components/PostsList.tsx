import React, { useState } from 'react';
import { usePosts } from '../context/PostsContext';
import Link from 'next/link';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const PostsList: React.FC = () => {
  const { posts, deletePost, updatePost, addPost } = usePosts();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on the search query
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search posts..."
        className="border border-gray-300 rounded px-3 py-1 mb-4"
      />
      <ul>
        {filteredPosts.map(post => (
          <li key={post.id} className="bg-white dark:bg-gray-800 rounded shadow p-4 mb-4">
            <Link href={`/posts/${post.id}`} className="text-black hover:underline">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex items-center mb-2 md:mb-0">
                  <div className="flex items-center">
                    <FaThumbsUp className="text-green-500 mr-1" />
                    <span>{post.reactions.likes}</span>
                  </div>
                  <div className="flex items-center ml-4">
                    <FaThumbsDown className="text-red-500 mr-1" />
                    <span>{post.reactions.dislikes}</span>
                  </div>
                </div>
                <div className="md:ml-4">
                  <h2 className="text-lg font-bold">{post.title}</h2>
                  <p className="text-sm">{post.body}</p>
                  <div className="flex flex-wrap mt-2">
                    {post.tags.map(tag => (
                      <div key={tag} className="bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2 mb-2">{tag}</div>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500">{post.views} min read | Selected for you</div>
                </div>
              </div>
            </Link>
            <div className="flex mt-2">
              <button onClick={() => deletePost(post.id)} className="text-red-500 hover:text-red-700 mr-2">Delete</button>
              <button onClick={() => updatePost(post.id, { ...post, title: 'Updated Title' })} className="text-black hover:text-blue-700">Edit</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => addPost({ id: posts.length + 1, image: '', title: 'New Post', body: 'It is something', tags: [], reactions: { likes: 0, dislikes: 0 }, views: 0, userId: 1 })} className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Add Post</button>
    </div>
  );
};

export default PostsList;
