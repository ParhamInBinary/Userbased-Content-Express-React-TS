import React from 'react';
  
export const AdminButton: React.FC = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
  
    if (user.isAdmin) {
      return <button>View Users</button>;
    } else {
      return null;
    }
  }
  
  export default AdminButton;
  