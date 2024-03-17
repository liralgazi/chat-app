// MessageBox.tsx
import React from "react";
import { Typography, Paper } from "@mui/material";

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
}

interface MessageBoxProps {
  message: Message;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        maxWidth: "60%",
        padding: "10px 15px",
        margin: "10px auto",
        backgroundColor: "#e0f7fa",
        borderRadius: "20px",
        wordBreak: "break-word",
      }}
    >
      <Typography variant="body1" gutterBottom>
        {message.text}
      </Typography>
      <Typography
        variant="caption"
        sx={{ display: "block", textAlign: "right" }}
      >
        {new Date(message.timestamp).toLocaleTimeString()}
      </Typography>
    </Paper>
  );
};

export default MessageBox;
