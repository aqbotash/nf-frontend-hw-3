"use client"
import Intro from "@/components/Intro";
import PostCard from "@/components/PostCard";
import {useState, useEffect} from 'react';
import {Post}  from "@/types/index";
import PostList from "@/components/PostsList";

export default function Home() {
  return (
    <main className="flex min-h-screen dark:text-white items-center justify-center">
      Main Page
    </main>
  );
}
