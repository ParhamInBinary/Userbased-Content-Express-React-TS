import React from 'react';

interface UserCardProps {
  user: {
    id: number;
    name: string;
    email: string;
  };
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, handleEdit, handleDelete }) => {
  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={() => handleEdit(user.id)}>Edit</button>
      <button onClick={() => handleDelete(user.id)}>Delete</button>
    </div>
  );
};

export default UserCard;
