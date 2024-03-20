import MessageBox from "../../components/helpers/MessageBox";
import { Message } from "../../components/helpers/Message";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Container,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ChatStyles.scss";
import { useWebSocket } from "../../components/hooks/useWebSocket";
import { useNotificationPermission } from "../../components/hooks/useNotificationPermission";
import { useSendMessage } from "../../components/hooks/useSendMessage";
import { showNotification } from "../../components/helpers/showNotification";

const Chat = () => {
  //gives you access to the current location object
  const location = useLocation();
  //extract the name
  const name = location.state?.name || "Unknown";
  const [messages, setMessages] = useState<Message[]>([]);

  const onNewMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    // Check if the document is not in focus
    if (document.visibilityState === "hidden") {
      showNotification(message);
    }
  };

  const onReceiveAllMessages = (msgs: Message[]) => {
    // TODO validations
    setMessages(msgs);
  };

  const { sendMessage } = useWebSocket(onNewMessage, onReceiveAllMessages);

  const { newMessage, setNewMessage, handleSendMessage } = useSendMessage({
    sendMessage,
    name,
  });

  //checks if permission granted from the browser
  useNotificationPermission();

  // Synchronize fetched messages with state
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages");
        const data: Message[] = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, []);

  console.log("lalala");
  return (
    <Box className="big-box">
      <Box className="big-chat-box">
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
            {name}, Welcome to the chat! 👋
          </Typography>
          <Stack className="chat-stack">
            <Box className="message-box">
              {messages.map((message) => (
                <MessageBox
                  key={message.id}
                  message={message}
                  currentUser={name}
                />
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
                sx={{
                  backgroundColor: "#2f6d7a",
                }}
              >
                Send
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Chat;
