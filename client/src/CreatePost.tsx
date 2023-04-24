import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';


export function CreatePost() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (response.status == 201) {
        setTitle('');
        setContent('');
      } else {
        throw new Error('Failed to create post');
      }
    } catch (err) {
      console.error(err);
    }
  };

    return (
        <form onSubmit={handleSubmit} style={{marginTop: "60 rem"}}>
          <h1>Create a new post</h1>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      );
    }
    