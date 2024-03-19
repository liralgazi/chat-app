import { Message } from "./Message";
// Function to show desktop notification
export const showNotification = (message: Message) => {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("New Message", {
      body: `${message.sender}: ${message.text}`,
      // Optionally, you can add an icon here
    });
  } else {
    console.log(
      "Notification permission is not granted or Notifications are not supported"
    );
  }
};
