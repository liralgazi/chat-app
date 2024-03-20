import { useEffect } from 'react';
import io from 'socket.io-client';
import { Message, NewMessage } from '../helpers/Message'; 

const socket = io("http://localhost:3002", {
  transports: ["websocket"], 
});

export const useWebSocket = (onNewMessage: (message: Message) => void) => {
  useEffect(() => {
    socket.on("message", onNewMessage);

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