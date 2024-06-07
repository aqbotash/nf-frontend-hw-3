// pages/posts/[slug].tsx
'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { usePosts } from '@/context/PostsContext';
import { Post } from '@/types';

const PostPage: React.FC = () => {
  const router = useRouter();
  const { posts } = usePosts();
  const { slug } = useParams<{ slug: string }>();
  const [userName, setUserName] = useState<string>('');

  // Find the post based on the slug from the route
  const post: Post | undefined = posts.find(post => post.id === Number(slug));

  useEffect(() => {
    if (post) {
      axios.get(`https://dummyjson.com/users/${post.userId}`)
        .then(response => {
          console.log(response.data);
          setUserName(response.data.username || 'Unknown User');
        })
        .catch(error => {
          console.error('Error fetching user information:', error);
        });
    }
  }, [post]);

  if (!post) {
    return <div className="container mx-auto py-8">Post not found</div>;
  }

  return (
    <div className="container mx-auto py-8 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 dark:text-gray-100">{post.body}</div>
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500 dark:text-gray-200">{post.views} min read</div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Tags:</h2>
        <ul className="flex flex-wrap">
          {post.tags.map(tag => (
            <li key={tag} className="bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2 mb-2">{tag}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Reactions:</h2>
        <div>Likes: {post.reactions.likes}</div>
        <div>Dislikes: {post.reactions.dislikes}</div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">User Name:</h2>
        <div>{userName}</div>
      </div>
    </div>
  );
};

export default PostPage;
