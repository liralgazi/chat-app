import { useEffect, useState } from "react";
import { Message } from "../helpers/Message";

export const useFetchMessages = (roomName: string): Message[] => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/messages/${roomName}`); // Adjusted for room-specific fetching
        const data: Message[] = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [roomName]);

  return messages;
};