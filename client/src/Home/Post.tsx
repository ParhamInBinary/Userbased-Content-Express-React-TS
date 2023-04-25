import { checkIsLoggedIn } from "../checkIsLoggedIn";
import { Post } from "./Home";
interface PostProps {
  post: Post;
}

export function Post({ post }: PostProps) {
  const handleDeletePost = async () => {
    checkIsLoggedIn();
    
    const response = await fetch(`/api/posts/${post._id}`, {
      method: "DELETE",
    });
  };

  return (
    <div
      className="container"
      style={{
        margin: "1rem 0",
        padding: "1rem",
        border: "1px solid lightblue",
        borderRadius: "5px",
        boxShadow: "2px 2px 10px gray",
      }}
    >
      <p
        style={{
          borderBottom: "1px solid lightgray",
          padding: "5px 0",
        }}
      >
        {post.title}
      </p>
      <div style={{ fontSize: "20px", padding: "5px 0" }}>
        {post.content}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <p style={{ marginTop: "1rem", color: "gray" }}>
          author: {post.author}
        </p>

        <div
          style={{
            gap: "1rem",
            width: "3rem",
            color: "gray",
          }}
        >
          <span
            style={{
              marginRight: "1rem",
              cursor: "pointer",
            }}
          >
            Edit
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={handleDeletePost}
          >
            &times;
          </span>
        </div>
      </div>
    </div>
  );
}
