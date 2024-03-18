import { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { Message } from "../helpers/Message";
type NewMessageCallback = (message: Message) => void;

export const useSocket = (roomName: string, onNewMessage: NewMessageCallback) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io("http://localhost:3002", {
      transports: ["websocket", "polling"],
    });

    // Assuming your backend emits a "joinRoom" event
    socketRef.current.emit("joinRoom", roomName);

    socketRef.current.on("message", onNewMessage);

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomName, onNewMessage]);

  const sendMessage = (message: Message) => {
    socketRef.current?.emit("message", message);
  };
  return { sendMessage };
}