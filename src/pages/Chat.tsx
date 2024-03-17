// Chat.tsx
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import MessageBox from "./MessageBox";
import { Message } from "./Message";

const Chat = () => {
  const location = useLocation();
  const name = location.state.name;
  const [messages, setMessages] = useState<Message[]>([]);

  //fetching the data from the db
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Message[] = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Welcome, {name}!
      </Typography>
      <Box>
        {messages.map((message) => (
          <MessageBox key={message.id} message={message} />
        ))}
      </Box>
    </Box>
  );
};

export default Chat;
