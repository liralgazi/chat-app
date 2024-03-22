import React from "react";
import { Box } from "@mui/material";
import MessageBox from "./MessageBox";
import { Message } from "./Message";

const DynamicMessages = React.forwardRef<
  HTMLDivElement,
  { messages: Message[]; name: string }
>(({ messages, name }, ref) => {
  return (
    <Box ref={ref} className="message-box">
      {messages.map((message, index) => (
        <MessageBox
          key={`${message.id}-${index}`}
          message={message}
          currentUser={name}
        />
      ))}
    </Box>
  );
});

export default DynamicMessages;
