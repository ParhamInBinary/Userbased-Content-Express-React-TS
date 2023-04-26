import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { checkIsLoggedIn } from "../checkIsLoggedIn";
import AdminButton from "../Home/AdminButton";

export function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = checkIsLoggedIn();

  const handleLogout = async (e: any) => {
    e.preventDefault();

    const response = await fetch("/api/users/logout", {
      method: "POST",
    });

    if (response.ok) {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            style={{ cursor: "pointer" }}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => navigate("/")}
          >
            Home
          </Typography>
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
            <AdminButton/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
