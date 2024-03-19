import React from "react";
import { Typography, Paper } from "@mui/material";
import { Message } from "./Message";

interface MessageBoxProps {
  message: Message;
  currentUser: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, currentUser }) => {
  const date = new Date(message.timestamp);
  const isCurrentUser = message.sender === currentUser;
  const messageClass = isCurrentUser ? "sent-message" : "received-message";

  return (
    <Paper
      elevation={2}
      className={`message-box ${messageClass}`}
      sx={{
        maxWidth: "60%",
        padding: "10px 15px",
        margin: "10px auto",
        borderRadius: "20px",
        wordBreak: "break-word",
        alignSelf: isCurrentUser ? "flex-end" : "flex-start",
      }}
    >
      <Typography variant="body1" gutterBottom>
        {message.text}
      </Typography>
      <Typography variant="body2" sx={{ color: "#888" }}>
        {message.sender === currentUser ? (
          `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
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
