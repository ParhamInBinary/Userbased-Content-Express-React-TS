import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';

interface User {
  id: number;
  name: string;
  email: string;
}

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleEdit = (id: number) => {
    // Skicka användaren till en sida för att redigera användaren med id:t
  };

  const handleDelete = (id: number) => {
    // Ta bort användaren med id:t från databasen och uppdatera användarlistan
  };

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard key={user.id} user={user} handleEdit={handleEdit} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default UserList;
