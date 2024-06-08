"use client"
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../lib/axios'; // Import Axios
import { useAuth } from './AuthContext';

interface Post {
  id: number;

  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
  userId: number;
}

interface Reaction {
  likes: number;
  dislikes: number;
}

interface PostsContextType {
  posts: Post[];
  addPost: (post: Post) => void;
  updatePost: (id: number, updatedPost: Post) => void;
  deletePost: (id: number) => void;
}

const defaultPostsContext: PostsContextType = {
  posts: [],
  addPost: () => {},
  updatePost: () => {},
  deletePost: () => {},
};

const PostsContext = createContext<PostsContextType>(defaultPostsContext);

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const {authToken} = useAuth();

  useEffect(() => {
    axios.get('auth/posts')
      .then(response => {
        console.log(response.data.posts);
        setPosts(response.data.posts.map((post: any) => ({
          id: post.id,
          title: post.title,
          body: post.body,
          tags: post.tags,
          reactions: post.reactions,
          views: post.views,
          userId: post.userId,
        })));
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, [authToken]); // Run the effect only once on component mount

  const addPost = (post: Post) => {
    setPosts([...posts, post]);
  };

  const updatePost = (id: number, updatedPost: Post) => {
    setPosts(posts.map(post => (post.id === id ? updatedPost : post)));
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  return useContext(PostsContext);
};
