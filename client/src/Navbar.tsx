import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export function Navbar() {

    const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => navigate('/')}>
            Home
          </Typography>
          <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}