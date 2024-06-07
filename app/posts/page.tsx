"use client"
import Intro from "@/components/Intro";
import PostList from "@/components/PostsList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Intro/>
      <PostList/>
    </main>
  );
}
