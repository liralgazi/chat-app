// MessageBox.tsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { Message } from "./Message";

interface MessageBoxProps {
  message: Message;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        padding: 2,
        marginBottom: 2,
        backgroundColor: "#f0f0f0", // A light grey background
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        {message.sender}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {message.text}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {new Date(message.timestamp).toLocaleTimeString()}
      </Typography>
    </Paper>
  );
};

export default MessageBox;
