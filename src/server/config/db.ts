//db
import pg from 'pg';
import { drizzle } from "drizzle-orm/node-postgres";
import {pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { Message } from '../../components/helpers/Message';
const client = new pg.Client({
    connectionString: "postgres://postgres:la1234@localhost:5432/chat-app",
  });

await client.connect();
const db = drizzle(client);
const messages = pgTable('messages', {
    id: serial('id').primaryKey(),
    text: text('text').notNull(),
    sender: text('sender'),
    timestamp: timestamp('timestamp').notNull()
  });

  export const saveMessage = async (message: Message) => {
    const query = `
        INSERT INTO messages(text, sender, timestamp)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const values = [message.text, message.sender, new Date()];
    try {
        const res = await client.query(query, values);
        console.log(res.rows[0]);
    } catch (err) {
        console.error(err);
    }
  };
  

export const getAllMessages = async () => {
    const query = `SELECT * FROM messages ORDER BY timestamp ASC;`;
    try {
        const res = await client.query(query);
        return res.rows;
    } catch (err) {
        console.error(err);
        return [];
    }
};


/*
export const saveMessage = async (message: Omit<Message, 'id'>): Promise<Message> => {
  // Insert the message into the database using Drizzle
  const [insertedMessage] = await db
    .insertInto(messages)
    .values({
      text: message.text,
      sender: message.sender,
      timestamp: new Date(), // Assumes current timestamp if not provided
    })
    .returning(messages.$all) // Return all fields of the inserted row
    .execute();

  return insertedMessage;
};
export const getAllMessages = async (): Promise<Message[]> => {
  // Select all messages from the database using Drizzle, ordered by timestamp
  const messagesList = await db
    .selectFrom(messages)
    .selectAll()
    .orderBy(messages.timestamp, 'ASC')
    .execute();

  return messagesList;
};
*/