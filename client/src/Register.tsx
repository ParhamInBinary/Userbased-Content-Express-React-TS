import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, TextField, Box } from "@mui/material";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5173/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.status == 201) {
        navigate('/login');
      } else {
        throw new Error('Failed to register');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "0 16px",
        flexDirection: 'column'
      }}
    >
      <AccountCircleIcon sx={{ fontSize: 96, color: 'lightgray' }} />
      <Box sx={{ width: "100%", maxWidth: "400px" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            id="username"
            label="Username"
            type="string"
            fullWidth
            required
            margin="normal"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            id="repeatPassword"
            label="Repeat password"
            type="password"
            fullWidth
            required
            margin="normal"
            variant="outlined"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            fullWidth
          >
            Register account
          </Button>
        </form>
      </Box>
    </Box>
  );
}
