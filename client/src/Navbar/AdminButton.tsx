import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const AdminButton: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToAdmin = () => {
    navigate("/admin");
  };

  return (
    <Button
      style={{
        borderRight: " 1px solid lightgrey",
        borderRadius: "0",
      }}
      color="inherit"
      onClick={handleNavigateToAdmin}
    >
      Users
    </Button>
  );
};
