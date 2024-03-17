// Message.ts
export interface Message {
    id: number;
    text: string;
    sender: string;
    timestamp: Date; // or string, depending on how the date is being fetched
  }
  