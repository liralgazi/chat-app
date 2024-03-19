import { useEffect } from 'react';

export const useNotificationPermission = () => {
  useEffect(() => {
    // Log the current notification permission status
    console.log(`Notification permission: ${Notification.permission}`);
    // Request permission if not already granted
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        console.log(`New Notification permission: ${permission}`);
      });
    }
  }, []);
};