import { useCallback, useState } from 'react';

type SendMessageProps = {
  sendMessage: (message: { text: string; sender: string; timestamp: Date }) => void;
  name: string;
};

export const useSendMessage = ({ sendMessage, name }: SendMessageProps) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim()) {
      sendMessage({
        text: newMessage,
        sender: name,
        timestamp: new Date(),
      });
      setNewMessage("");
    }
  }, [newMessage, name, sendMessage]);

  return { newMessage, setNewMessage, handleSendMessage };
};
