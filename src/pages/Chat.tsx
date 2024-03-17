import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

interface ChatProps {
  name: string;
}

interface Message {
  id: number;
  text: string;
  sender: string;
  createdAt: Date;
}

const Chat = () => {
  const location = useLocation();
  // Assume we have a state with the name property passed to this route
  const { name } = location.state as { name: string };
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <Box>
      <Typography variant="h5">Welcome, {name}!</Typography>
      <Box>
        {messages.map((message) => (
          <div key={message.id}>
            <Typography
              color={message.sender === name ? "primary" : "textSecondary"}
            >
              {message.sender}: {message.text}
            </Typography>
            <Typography variant="caption">
              {new Date(message.createdAt).toLocaleTimeString()}
            </Typography>
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default Chat;
