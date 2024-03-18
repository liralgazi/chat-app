import React, { useState, useEffect, useCallback } from "react";
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

const Chat = () => {
  //gives you access to the current location object
  const location = useLocation();
  //extract the name
  const name = location.state.name;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  //fetching the messeges from the db
  const fetchMessages = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleSendMessage = async () => {
    alert("message sent!");
    setNewMessage("");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: "#e4eff0",
        height: "100vh",
        borderRadius: "20px",
        boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          p: 2,
          textAlign: "center",
          fontWeight: "bold",
          color: "#1976d2",
          //fontFamily: "Candara",
          fontFamily: "fantasy",
          letterSpacing: 4,
        }}
      >
        {name}, Welcome to the chat !
      </Typography>
      <Stack
        sx={{ height: "calc(100vh - 150px)", justifyContent: "space-between" }}
      >
        {" "}
        <Box sx={{ overflowY: "auto", p: 2, flexGrow: 1 }}>
          {messages.map((message) => (
            <MessageBox key={message.id} message={message} />
          ))}
        </Box>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          noValidate
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <TextField
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            variant="outlined"
            placeholder="Type a message..."
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            sx={{ whiteSpace: "nowrap" }}
          >
            Send
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default Chat;
