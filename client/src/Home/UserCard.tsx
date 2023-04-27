import React from 'react';

interface UserCardProps {
  user: {
    _id: number;
    Username: string;
  };

  getUsers: () => Promise<void>
}

const UserCard: React.FC<UserCardProps> = ({ user, getUsers }: UserCardProps) => {

  const handleEdit = async() => {
    const response = await fetch(`/api/users/${user._id}`, 
    {method: 'PUT',})

    if(response.ok){
      getUsers()
    }
  }

  const handleDelete = async() => {
    const response = await fetch(`/api/users/${user._id}`, 
    {method: 'DELETE',})

    if(response.ok){
      getUsers()
    }
  }
  
  return (
    <div className="user-card">
      <h2>{user.Username}</h2>
      <button onClick={() => handleEdit()}>Edit</button>
      <button onClick={() => handleDelete()}>Delete</button>
    </div>
  );
};

export default UserCard;
