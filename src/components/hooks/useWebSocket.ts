import { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';
import { Message } from '../helpers/Message'; 

const socket = io("http://localhost:3002", {
  transports: ["websocket"], 
});
// Exclude 'id' for outgoing messages
type NewMessage = Omit<Message, 'id'>; 

export const useWebSocket = (name: string, onNewMessage: (message: Message) => void) => {
  useEffect(() => {
    socket.on("message", onNewMessage);

    // Cleanup on unmount
    return () => {
      socket.off("message");
    };
  }, [onNewMessage]);

  const sendMessage = (message: NewMessage) => {
    socket.emit("message", message);
  };

  return { sendMessage };
};