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
        marginTop: "5rem",
        padding: "1rem",
        width: "100%",
        maxWidth: "300px",
        height: "100%",
        maxHeight: "100px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h2 style={{ margin: "0" }}>{user.Username}</h2>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "1rem" }}>{user.isAdmin}</span>

        {!user.isAdmin ? (
          <button
            onClick={() => handleEdit()}
            style={{
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#4caf50",
              color: "#fff",
              cursor: "pointer",
              marginRight: "0.5rem",
            }}
          >
            Make Admin
          </button>
        ) : (
          <button
            onClick={() => handleEdit()}
            style={{
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#4caf50",
              color: "#fff",
              cursor: "pointer",
              marginRight: "0.5rem",
            }}
          >
            Remove Admin
          </button>
        )}
        <button
          onClick={() => handleDelete()}
          style={{
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#f44336",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
