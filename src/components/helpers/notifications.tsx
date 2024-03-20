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

export const checkNotificationPermission = () => {
  // Log the current notification permission status
  console.log(`Notification permission: ${Notification.permission}`);
  // Request permission if not already granted
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
      console.log(`New Notification permission: ${permission}`);
    });
  }
};
