import { Message } from "./Message";

async function loadMoreMessages(
  offset: number,
  setLoading: (loading: boolean) => void,
  setHasMore: (hasMore: boolean) => void,
  setMessages: (callback: (prevMessages: Message[]) => Message[]) => void,
  setOffset: (callback: (prevOffset: number) => number) => void,
  loading: boolean,
  hasMore: boolean
) {
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
}

export default loadMoreMessages;
