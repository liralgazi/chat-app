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
  // Parse the timestamp string to a Date object
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
      <Typography
        variant="caption"
        sx={{ display: "block", textAlign: "right" }}
      >
        {date.toLocaleTimeString()}
      </Typography>
    </Paper>
  );
};

export default MessageBox;
