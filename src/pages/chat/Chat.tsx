// with loadMessages
import { Message, NewMessage } from "../../components/helpers/Message";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Container,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./ChatStyles.scss";
import { useWebSocket } from "../../components/hooks/useWebSocket";
import {
  checkNotificationPermission,
  showNotification,
} from "../../components/helpers/notifications";
import DynamicMessages from "../../components/helpers/DynamicMessages";
import loadMoreMessages from "../../components/helpers/loadMoreMessages";
const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const messageBoxRef = useRef<HTMLDivElement>(null);

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
    const newTypedMsg: NewMessage = {
      text: newMessage,
      sender: name,
      timestamp: new Date(),
    };
    sendMessage(newTypedMsg);
    setNewMessage("");
  };

  useEffect(() => {
    // Load initial messages
    loadMoreMessages(
      offset,
      setLoading,
      setHasMore,
      setMessages,
      setOffset,
      loading,
      hasMore
    );
    //check if there are notification permission
    checkNotificationPermission();
  }, []);
  useEffect(() => {
    const messageBox = messageBoxRef.current;
    const handleScroll = () => {
      // Check if the user has scrolled to the top of the message box
      if (messageBox && messageBox.scrollTop < 100) {
        loadMoreMessages(
          offset,
          setLoading,
          setHasMore,
          setMessages,
          setOffset,
          loading,
          hasMore
        );
      }
    };

    messageBox?.addEventListener("scroll", handleScroll);

    return () => {
      messageBox?.removeEventListener("scroll", handleScroll);
    };
    // messages.length is added to trigger a re-check when messages update
  }, [loading, hasMore, offset, messages.length]);
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
            <DynamicMessages
              ref={messageBoxRef}
              messages={messages}
              name={name}
            />

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
