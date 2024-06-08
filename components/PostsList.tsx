import React, { useState } from 'react';
import { usePosts } from '../context/PostsContext';
import Link from 'next/link';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { Post } from '@/types';

const PostsList: React.FC = () => {
  const { posts, deletePost, updatePost, addPost } = usePosts();
  const [searchQuery, setSearchQuery] = useState('');
  const [newPost, setNewPost] = useState<Partial<Post>>({
    title: '',
    body: '',
    tags: [],
  });
  const [userReactions, setUserReactions] = useState<{ [key: number]: 'like' | 'dislike' | null }>({});
  const [editPostId, setEditPostId] = useState<number | null>(null);
  const [editPost, setEditPost] = useState<Partial<Post>>({
    title: '',
    body: '',
    tags: [],
  });

  const filteredPosts = posts.filter(post =>
    post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPost = () => {
    if (newPost.title?.trim() && newPost.body?.trim()) {
      addPost({
        id: posts.length + 1,
        title: newPost.title,
        body: newPost.body,
        tags: newPost.tags || [],
        reactions: { likes: 0, dislikes: 0 },
        views: 0,
        userId: 1,
      });
      setNewPost({
        title: '',
        body: '',
        tags: [],
      });
    }
  };

  const handleLike = (postId: number) => {
    const post = posts.find(p => p.id === postId);
    const reaction = userReactions[postId];

    if (post) {
      if (reaction === 'like') {
        updatePost(postId, { ...post, reactions: { ...post.reactions, likes: post.reactions.likes - 1 } });
        setUserReactions({ ...userReactions, [postId]: null });
      } else if (reaction === 'dislike') {
        updatePost(postId, { 
          ...post, 
          reactions: { 
            ...post.reactions, 
            likes: post.reactions.likes + 1, 
            dislikes: post.reactions.dislikes - 1 
          } 
        });
        setUserReactions({ ...userReactions, [postId]: 'like' });
      } else {
        updatePost(postId, { ...post, reactions: { ...post.reactions, likes: post.reactions.likes + 1 } });
        setUserReactions({ ...userReactions, [postId]: 'like' });
      }
    }
  };

  const handleDislike = (postId: number) => {
    const post = posts.find(p => p.id === postId);
    const reaction = userReactions[postId];

    if (post) {
      if (reaction === 'dislike') {
        updatePost(postId, { ...post, reactions: { ...post.reactions, dislikes: post.reactions.dislikes - 1 } });
        setUserReactions({ ...userReactions, [postId]: null });
      } else if (reaction === 'like') {
        updatePost(postId, { 
          ...post, 
          reactions: { 
            ...post.reactions, 
            likes: post.reactions.likes - 1, 
            dislikes: post.reactions.dislikes + 1 
          } 
        });
        setUserReactions({ ...userReactions, [postId]: 'dislike' });
      } else {
        updatePost(postId, { ...post, reactions: { ...post.reactions, dislikes: post.reactions.dislikes + 1 } });
        setUserReactions({ ...userReactions, [postId]: 'dislike' });
      }
    }
  };

  const handleEditPost = (post: Post) => {
    setEditPostId(post.id);
    setEditPost({
      title: post.title,
      body: post.body,
      tags: post.tags,
    });
  };

  const handleUpdatePost = () => {
    if (editPostId !== null && editPost.title?.trim() && editPost.body?.trim()) {
      updatePost(editPostId, {
        ...posts.find(p => p.id === editPostId),
        ...editPost,
      } as Post);
      setEditPostId(null);
      setEditPost({
        title: '',
        body: '',
        tags: [],
      });
    }
  };

  const handleCancelEdit = () => {
    setEditPostId(null);
    setEditPost({
      title: '',
      body: '',
      tags: [],
    });
  };

  return (
    <div className="flex flex-col gap-y-4 w-full dark:text-white px-4 md:px-40">
      <h2 className="text-lg font-bold">Add New Post</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          placeholder="Title"
          className="flex-1 border border-gray-300 dark:bg-white rounded px-3 py-1 dark:text-black"
        />
        <textarea
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          placeholder="Body"
          className="flex-1 border border-gray-300 rounded px-3 py-1 dark:bg-white dark:text-black"
        />
        <input
          type="text"
          value={newPost.tags?.join(', ') || ''}
          onChange={(e) => setNewPost({ ...newPost, tags: e.target.value.split(',').map((tag) => tag.trim()) })}
          placeholder="Tags (comma separated)"
          className="flex-1 border border-gray-300 rounded px-3 py-1 dark:bg-white dark:text-black"
        />
        <button
          onClick={handleAddPost}
          className="bg-gray-800 hover:bg-gray-700 dark:hover:bg-gray-300 dark:bg-white dark:text-black text-white font-bold py-2 px-4 rounded"
        >
          Add Post
        </button>
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search posts..."
        className="border border-gray-300 rounded px-3 py-1 dark:bg-gray-700 dark:text-white w-full"
      />
      <ul className="flex flex-col gap-4">
        {filteredPosts.map((post) => (
          <li
            key={post.id}
            className="bg-white dark:bg-gray-700 rounded shadow p-4 flex flex-col gap-4"
          >
            <div>
              <Link href={`/posts/${post.id}`} className="text-black hover:underline dark:text-white">
                <h2 className="text-lg font-bold">{post.title}</h2>
                <p className="text-sm">{post.body}</p>
              </Link>
              <div className="flex flex-wrap gap-2 mt-2">
                {post.tags.map((tag) => (
                  <div key={tag} className="bg-gray-200 text-gray-800 px-2 py-1 rounded">
                    {tag}
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-500">{post.views} views</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4 dark:text-white">
                <div className="flex items-center gap-1">
                  <FaThumbsUp
                    className={`cursor-pointer ${
                      userReactions[post.id] === 'like'
                        ? 'text-green-500'
                        : 'dark:text-gray-200 text-gray-500'
                    }`}
                    onClick={() => handleLike(post.id)}
                  />
                  <span>{post.reactions.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaThumbsDown
                    className={`cursor-pointer ${
                      userReactions[post.id] === 'dislike'
                        ? 'text-red-500'
                        : 'dark:text-gray-200 text-gray-500'
                    }`}
                    onClick={() => handleDislike(post.id)}
                  />
                  <span>{post.reactions.dislikes}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => deletePost(post.id)}
                  className="text-red-500 hover:text-red-700 dark:text-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEditPost(post)}
                  className="text-black hover:text-gray-700 dark:text-white"
                >
                  Edit
                </button>
              </div>
            </div>
            {editPostId === post.id && (
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <input
                  type="text"
                  value={editPost.title}
                  onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                  placeholder="Title"
                  className="flex-1 border border-gray-300 rounded px-3 py-1 dark:bg-white dark:text-black"
                />
                <textarea
                  value={editPost.body}
                  onChange={(e) => setEditPost({ ...editPost, body: e.target.value })}
                  placeholder="Body"
                  className="flex-1 border border-gray-300 rounded px-3 py-1 dark:bg-white dark:text-black"
                />
                <input
                  type="text"
                  value={editPost.tags?.join(', ') || ''}
                  onChange={(e) => setEditPost({ ...editPost, tags: e.target.value.split(',').map((tag) => tag.trim()) })}
                  placeholder="Tags (comma separated)"
                  className="flex-1 border border-gray-300 rounded px-3 py-1 dark:bg-white dark:text-black"
                />
                <button
                  onClick={handleUpdatePost}
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded dark:bg-white dark:text-black dark:hover:bg-gray-300"
                >
                  Update Post
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList; 