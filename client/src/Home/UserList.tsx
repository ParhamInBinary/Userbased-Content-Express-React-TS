import { useState, useEffect } from 'react';

export function UserList() {
   
  interface User {
    _id: string;
    username: string;
    isAdmin: boolean;
  }

  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();

    if (response.ok) {
      setUsers(data);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleEdit = async () => {
    const response = await fetch(`/api/posts/:id}`, {
      method: "PUT",
      headers: {"Content-type": "application/json"},
    });

    if (response.ok){
      getUsers();
    }
  };
// ${user._id} fungerar inte här

  const handleDelete = async () => {
    const response = await fetch(`/api/posts/:id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });

    if (response.ok) { 
      getUsers();
    }
  };
 
  
  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user._id}>
          <p>{user.username}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ))}
    </div>
  );
}
