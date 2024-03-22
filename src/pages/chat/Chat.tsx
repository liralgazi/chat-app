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
//import loadMoreMessages from "../../components/helpers/loadMoreMessages";
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

  const loadMoreMessages = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    console.log("Loading more messages...");
    try {
      const response = await fetch(`/api/messages?limit=20&offset=${offset}`);
      const newMessages: Message[] = await response.json();
      if (newMessages.length === 0) {
        setHasMore(false);
      } else {
        setMessages((prevMessages) => {
          // Create a set of existing IDs for quick lookup
          const existingIds = new Set(prevMessages.map((m) => m.id));
          // Filter out any new messages that already exist in the state
          const filteredNewMessages = newMessages.filter(
            (message) => !existingIds.has(message.id)
          );
          // Update the state with filtered new messages to prevent duplicate keys
          return [...prevMessages, ...filteredNewMessages];
        });
        // Ensure offset is updated correctly to fetch the next set of messages
        setOffset((prevOffset) => prevOffset + newMessages.length);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Load initial messages
    loadMoreMessages();
    //check if there are notification permission
    checkNotificationPermission();
  }, []);
  useEffect(() => {
    const messageBox = messageBoxRef.current;
    const handleScroll = () => {
      // Check if the user has scrolled to the top of the message box
      if (messageBox && messageBox.scrollTop < 100) {
        loadMoreMessages();
      }
    };

    messageBox?.addEventListener("scroll", handleScroll);

    return () => {
      messageBox?.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore, offset, messages]);
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
