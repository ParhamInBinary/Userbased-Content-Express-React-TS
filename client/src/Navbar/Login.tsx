import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     handle login logic here
//   };

  return (
    <>
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
        <form >
          <TextField
            id="username"
            label="Username"
            type="username"
            fullWidth
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            fullWidth
          >
            Sign In
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ mt: 3 }}
            fullWidth
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </form>
      </Box>
    </Box>
    </>
  );
}
