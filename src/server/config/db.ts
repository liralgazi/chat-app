import pg from 'pg';
import { drizzle } from "drizzle-orm/node-postgres";
import {pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { Message } from '../../pages/Message';

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
