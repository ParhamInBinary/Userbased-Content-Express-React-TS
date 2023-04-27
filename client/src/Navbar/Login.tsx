import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Button, TextField } from "@mui/material";
// import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    
    const newUser = {
      username,
      password,
    };
    
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-type": "application/json" },
    });
    
    const data = await response.json();
    console.log(data)
    
    // const schema = Joi.object({
    //   username: !response.redirected,
    //   password: response.redirected,
    // });

    // const result = schema.validate(newUser);

    // if (result.error) {
    //   console.log(result.error.message)
    //   setError(result.error.message)
    //   return;
    // }

    if (response.ok) {
      localStorage.setItem(
        "loggedInUsername",
        data.username
      );
      localStorage.setItem("loggedInUserID", data._id);
      localStorage.setItem("loggedInIsAdmin", data.isAdmin);

      navigate("/");
    }
  };

  return (
    <>
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
              type="username"
              fullWidth
              required
              margin="normal"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {/* {error && (
              <span style={{color: 'red'}}>Incorrect username or password</span>
            )} */}
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
              {/* {error && (
                <span style={{color: 'red'}}>Incorrect username or password</span>
              )} */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
              fullWidth
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{ mt: 3 }}
              fullWidth
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
}
