import pg from 'pg';
import { drizzle } from "drizzle-orm/node-postgres";
import {pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';


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


export const getAllMessages = async () =>{
    const res =  await db.select().from(messages);
    return res
}