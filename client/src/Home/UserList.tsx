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

  const handleEdit = () => {
    // logic for handling edit button click
  };

  const handleDelete = () => {
    // logic for handling delete button click
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
