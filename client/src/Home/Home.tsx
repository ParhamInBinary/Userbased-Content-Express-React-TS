import { useEffect, useState } from "react";
import { CreatePost } from "./CreatePost";
import { Post } from "./Post";

export interface Post {
  _id: string;
  author: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("/api/posts");
      const jsonResponse = await response.json();

      setPosts(jsonResponse);
    };
    console.log(posts);
    getPosts();
  }, []);

  return (
    <div className="mainContainer" style={{ width: "60%" }}>
      <CreatePost />

      <div className="postContainer">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
