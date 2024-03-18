import React from "react";
import { Typography, Paper } from "@mui/material";
import { Message } from "./Message";

interface MessageBoxProps {
  message: Message;
  currentUser: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, currentUser }) => {
  const date = new Date(message.timestamp);

  return (
    <Paper
      elevation={2}
      sx={{
        maxWidth: "60%",
        padding: "10px 15px",
        margin: "10px auto",
        backgroundColor: "#d3ede0",
        borderRadius: "20px",
        wordBreak: "break-word",
      }}
    >
      <Typography variant="body1" gutterBottom>
        {message.text}
      </Typography>
      <Typography variant="body2" sx={{ color: "#888", textAlign: "right" }}>
        {message.sender === currentUser ? ( // Check if sender is the current user
          `${date.toLocaleDateString()} ${date.toLocaleTimeString()}` // Display both date and time
        ) : (
          <>
            <Typography
              variant="caption"
              sx={{ fontSize: "small", fontWeight: "bold" }}
            >
              {message.sender}
            </Typography>{" "}
            - {`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
          </>
        )}
      </Typography>
    </Paper>
  );
};

export default MessageBox;
