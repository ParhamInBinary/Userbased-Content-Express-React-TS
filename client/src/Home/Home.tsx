import { useEffect, useState } from "react";
import { CreatePost } from "./CreatePost";
import { Post } from "./Post";
import '../index.css'
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

  const getPosts = async () => {
    const response = await fetch("/api/posts");
    const jsonResponse = await response.json();

    setPosts(jsonResponse);
  };

  useEffect(() => {
    
    getPosts();
  }, []);

  return (
    <div className="mainContainer">
      <CreatePost getPosts={getPosts} />

      <div className="postContainer">
        {posts.map((post) => (
          <Post key={post._id} post={post} getPosts={getPosts}/>
        ))}
      </div>
    </div>
  );
}
