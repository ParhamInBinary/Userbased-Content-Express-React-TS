import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const AdminButton: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToAdmin = () => {
    navigate('/admin');
  };

    return <Button style={{marginLeft: "1rem"}} color="inherit" onClick={handleNavigateToAdmin}>View Users</Button>;
;}