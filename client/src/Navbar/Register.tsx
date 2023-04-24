import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, TextField, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export function Register() {
    const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     handle login logic here
//   };

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
        <form >
          <TextField
            id="email"
            label="Email Address"
            type="email"
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
          <TextField
            id="repeatPassword"
            label="Repeat password"
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
            Register account
          </Button>
        </form>
      </Box>
    </Box>
  );
}
