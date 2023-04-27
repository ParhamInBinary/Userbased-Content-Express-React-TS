import { useNavigate } from 'react-router-dom';

export const AdminButton: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToAdmin = () => {
    navigate('/admin');
  };

    return <button onClick={handleNavigateToAdmin}>View Users</button>;
;}