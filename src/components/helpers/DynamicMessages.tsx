import { Box } from "@mui/material";
import MessageBox from "./MessageBox";
import { Message } from "./Message";

export default function DynamicMessages({
  messages,
  name,
}: {
  messages: Message[];
  name: string;
}) {
  return (
    <Box className="message-box">
      {messages.map(
        (
          message //TODO add key message.id
        ) => (
          <MessageBox key={message.id} message={message} currentUser={name} />
        )
      )}
    </Box>
  );
}
