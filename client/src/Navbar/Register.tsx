import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterAccount = async (e: any) => {
    e.preventDefault();

    const newUser = {
      username,
      password,
    };

    const response = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-type": "application/json" },
    });

    if (response.ok) {
      setUsername("");
      setPassword("");

      navigate("/login");
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
        flexDirection: "column",
      }}
    >
      <AccountCircleIcon
        sx={{ fontSize: 96, color: "lightgray" }}
      />
      <Box sx={{ width: "100%", maxWidth: "400px" }}>
        <form>
          <TextField
            id="username"
            label="Username"
            type="text"
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
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            fullWidth
            onClick={handleRegisterAccount}
          >
            Register account
          </Button>
        </form>
      </Box>
    </Box>
  );
}
