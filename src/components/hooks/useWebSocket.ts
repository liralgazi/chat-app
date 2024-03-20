import { useEffect } from 'react';
import io from 'socket.io-client';
import { Message } from '../helpers/Message'; 

const socket = io("http://localhost:3002", {
  transports: ["websocket"], 
});
// Exclude 'id' for outgoing messages
type NewMessage = Omit<Message, 'id'>; 

export const useWebSocket = (onNewMessage: (message: Message) => void, onReceiveAllMessages: (messages: Message[]) => void) => {
  useEffect(() => {
    socket.on("message", onNewMessage);
    // socket.on("allMessages", onReceiveAllMessages)

    // Cleanup on unmount
    return () => {
      socket.off("message");
      // socket.off("allMessages")
    };
  }, [onNewMessage]);

  //send the message to everyone
  const sendMessage = (message: NewMessage) => {
    socket.emit("message", message);
  };

  return { sendMessage };
};