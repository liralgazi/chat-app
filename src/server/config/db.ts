import pg from 'pg';
//import { drizzle } from "drizzle-orm/node-postgres";
//import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { Message } from '../../components/helpers/Message';
import dotenv from 'dotenv';
dotenv.config();


const client = new pg.Client({
    connectionString: process.env.PG_URL,
  });

await client.connect();

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
const db = drizzle(client);

const messagesTable = pgTable('messages', {
    id: serial('id').primaryKey(),
    text: text('text').notNull(),
    sender: text('sender'),
    timestamp: timestamp('timestamp').notNull()
 });

 export const saveMessage = async (message: Omit<Message, 'id'>): Promise<Message> => {
  const [insertedMessage] = await db
      .insertInto(messagesTable)
      .values({
          text: message.text,
          sender: message.sender,
          // Assume the database sets the timestamp; otherwise, use `new Date()`
      })
      .returning(messagesTable.all()) 
      .execute();

  return insertedMessage;
};

export const getAllMessages = async (): Promise<Message[]> => {
  const messages = await db
      .selectFrom(messagesTable)
      .selectAll()
      .orderBy(messagesTable.timestamp, 'ASC')
      .execute();

  return messages;
};
*/
