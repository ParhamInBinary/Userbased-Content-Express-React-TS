import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, Typography } from "@mui/material";
import React from "react";

interface UserCardProps {
  user: {
    _id: number;
    Username: string;
    isAdmin: boolean;
  };
  getUsers: () => Promise<void>;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  getUsers,
}: UserCardProps) => {
  const loggedInUser = localStorage.getItem('loggedInUsername')

  const handleEdit = async () => {
    const updatedUser = { ...user, isAdmin: !user.isAdmin };

    const response = await fetch(`/api/users/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    if (response.ok) {
      getUsers();
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/users/${user._id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      getUsers();
    }
  };

  return (
    <div
      className="user-card"
      style={{
        marginTop: "1rem",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        width: "20rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center" }}
      >
        <AccountCircleIcon
          fontSize="large"
          style={{ color: "lightgray" }}
        />
        <Typography
          variant="h6"
          component="div"
          style={{ margin: "0 5px" }}
        >
          {user.Username}
        </Typography>
      </div>
      {loggedInUser === user.Username ? ( <span>You can't edit your own status</span>) : (

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {!user.isAdmin ? (
          <Button
            type="submit"
            variant="outlined"
            size="large"
            sx={{ mt: 3 }}
            fullWidth
            onClick={handleEdit}
          >
            Admin
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            fullWidth
            onClick={handleEdit}
          >
            <span>Admin</span>
            <span style={{ marginLeft: '10px'}}>&#10003;</span>
          </Button>
        )}
        <Button
          type="submit"
          variant="outlined"
          color="error"
          size="large"
          sx={{ mt: 3 }}
          fullWidth
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
      )}
    </div>
  );
};

export default UserCard;
