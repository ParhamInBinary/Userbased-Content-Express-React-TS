import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { checkIsLoggedIn } from "../checkIsLoggedIn";
import { AdminButton } from "./AdminButton";

export function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = checkIsLoggedIn();
  const username = localStorage.getItem("loggedInUsername");
  const isAdmin = localStorage.getItem("loggedInIsAdmin");

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
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            style={{ cursor: "pointer" }}
            variant="h6"
            component="div"
            onClick={() => navigate("/")}
          >
            Home
          </Typography>
          <div>
            {isLoggedIn ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <p>{username}</p>
                <div
                  style={{
                    height: "10px",
                    width: "10px",
                    backgroundColor: "lightgreen",
                    borderRadius: "10px",
                    boxShadow: "1px 1px 5px lightgreen",
                    margin: "7px",
                  }}
                />
                {isLoggedIn && isAdmin === "true" && (
                  <AdminButton />
                )}
                <Button
                  color="inherit"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                color="inherit"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
