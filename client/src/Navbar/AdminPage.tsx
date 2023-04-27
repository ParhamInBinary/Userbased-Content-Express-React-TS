import { useEffect, useState } from "react";
import UserCard from "../Home/UserCard";

export interface User {
  _id: number;
  username: string;
  isAdmin: boolean;
}

export function AdminPage() {
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

  
  return (
   <>
    <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
      {users.map((user) => (
        <UserCard key = {user._id} user={{
          _id: user._id,
          Username: user.username,
          isAdmin: user.isAdmin
        }}
        getUsers={getUsers}
        />
      ))}
    </div>
    </> 
  )
    
}
