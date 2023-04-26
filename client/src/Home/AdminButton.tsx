import { useNavigate } from 'react-router-dom';

export const AdminButton: React.FC = () => {
  const data = JSON.parse(localStorage.getItem('data') || '{}');
  const navigate = useNavigate();

  const handleNavigateToAdmin = () => {
    navigate('/admin');
  };

  if (data.isAdmin) {
    return <button onClick={handleNavigateToAdmin}>View Users</button>;
  } else {
    return null;
  }
}

export default AdminButton;
