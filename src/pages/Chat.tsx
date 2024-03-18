import React, { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";

import "../styles/ChatStyles.scss";

import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Container,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import MessageBox from "./MessageBox";
import { Message } from "./Message";

const socket = io("http://localhost:3002", {
  transports: ["websocket", "polling"],
});

const Chat = () => {
  //gives you access to the current location object
  const location = useLocation();
  //extract the name
  const name = location.state.name;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  //fetching the messeges from the db
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

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    const fetchMessages = async () => {
      const response = await fetch("/api/messages");
      const data = await response.json();
      setMessages(data);
    };

    fetchMessages();

    return () => {
      socket.off("message");
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageToSend = {
        text: newMessage,
        sender: name,
        timestamp: new Date(),
      };
      socket.emit("message", messageToSend);
      setNewMessage("");
    }
  };
  return (
    <Container maxWidth="sm" className="chat-container">
      <Typography
        variant="h4"
        className="chat-title"
        sx={{
          fontFamily: "fantasy",
          fontSize: 30,
          letterSpacing: 3,
        }}
      >
        {name}, Welcome to the chat!
      </Typography>
      <Stack className="chat-stack">
        <Box className="message-box">
          {messages.map((message) => (
            <MessageBox key={message.id} message={message} currentUser={name} />
          ))}
        </Box>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          noValidate
          className="form-box"
        >
          <TextField
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            variant="outlined"
            placeholder="Type a message..."
            className="text-field"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            className="send-button"
          >
            Send
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default Chat;
