import React, { useState, useEffect, useCallback } from "react";
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
  const location = useLocation();
  const name = location.state.name;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Function to fetch messages
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

  //fetching the messeges from the db
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Function to handle sending messages
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newMessage, sender: name }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Clear the input after sending
      setNewMessage("");
      // Fetch messages again to update the list
      await fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          p: 2,
          textAlign: "center",
          fontWeight: "bold",
          color: "#1976d2",
        }}
      >
        Welcome to the chat, {name}!
      </Typography>
      <Stack
        sx={{ height: "calc(100vh - 150px)", justifyContent: "space-between" }}
      >
        {" "}
        {/* Adjust height as necessary */}
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
          sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }} // Use Flexbox for layout
        >
          <TextField
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            variant="outlined"
            placeholder="Type a message..."
            sx={{ flexGrow: 1 }} // Make the TextField flex to take up available space
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            sx={{ whiteSpace: "nowrap" }} // Prevents the button text from wrapping
          >
            Send
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default Chat;
