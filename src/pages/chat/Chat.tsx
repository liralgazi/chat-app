import { Message, NewMessage } from "../../components/helpers/Message";
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
import {
  checkNotificationPermission,
  showNotification,
} from "../../components/helpers/notifications";
import DynamicMessages from "../../components/helpers/DynamicMessages";

let limit = 20;
let offset = 0;

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  //gives you access to the current location object
  const location = useLocation();
  const name = location.state?.name || "Unknown"; //extract the name

  const onNewMessage = (message: Message) => {
    setMessages((prevMessages) => [message, ...prevMessages]);
    // Check if the document is not in focus
    if (document.visibilityState === "hidden") {
      showNotification(message);
    }
  };

  const { sendMessage } = useWebSocket(onNewMessage);

  const handleSendMessage = () => {
    let newTypedMsg: NewMessage = {
      text: newMessage,
      sender: name,
      timestamp: new Date(),
    };
    sendMessage(newTypedMsg);
    setNewMessage("");
  };

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
    checkNotificationPermission();
  }, []);

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
            <DynamicMessages messages={messages} name={name} />
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
