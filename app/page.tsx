"use client"
import Intro from "@/components/Intro";
import PostCard from "@/components/PostCard";
import {useState, useEffect} from 'react';
import {Post}  from "@/types/index";
import PostList from "@/components/PostsList";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen dark:text-white items-center justify-center flex-row gap-2 text-2xl">
      <div>Go to</div><Link href="/posts" className="font-bold dark:text-white">posts</Link>
    </main>
  );
}
