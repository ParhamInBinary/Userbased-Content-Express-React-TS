import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { checkIsLoggedIn } from "../checkIsLoggedIn";

export function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = async (e: any) => {
    checkIsLoggedIn();
    e.preventDefault();

    const newPost = {
      title,
      content,
    };

    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: { "Content-type": "application/json" },
    });

    if (response.ok) {
      setTitle("");
      setContent("");
    }
  };

  return (
    <div
      style={{
        borderBottom: "1px solid lightgray",
        paddingBottom: "1rem",
      }}
    >
      <div
        className="contentContainer"
        style={{ paddingTop: "7rem" }}
      >
        <TextField
          id="outlined-multiline-static"
          label="Title"
          fullWidth
          rows={4}
          placeholder="Add a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <TextField
          id="outlined-multiline-static"
          label="Post"
          multiline
          fullWidth
          rows={4}
          placeholder="Add content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
        }}
      >
        <Button
          variant="contained"
          size="medium"
          style={{ marginTop: "1rem" }}
          onClick={createPost}
        >
          Post
        </Button>
      </div>
    </div>
  );
}
