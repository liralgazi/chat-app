import { Message } from "./Message";

// Function to show desktop notification
export const showNotification = (message: Message) => {
  const chatIconPath = "../../assets/icons/chat_icon.png";
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("New Message", {
      body: `${message.sender}: ${message.text}`,
      icon: chatIconPath,
    });
  } else {
    console.log(
      "Notification permission is not granted or Notifications are not supported"
    );
  }
};
