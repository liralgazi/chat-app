import pg from 'pg';
import { Message } from '../../src/components/helpers/Message';
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
    const query = `SELECT * FROM messages ORDER BY timestamp DESC;`;
    try {
        const res = await client.query(query);
        return res.rows;
    } catch (err) {
        console.error(err);
        return [];
    }
};

// get chunk of messages if needed - through scrolling 
export const getPageOfMessages = async (limit: number, offset: number) => {
    const query = `SELECT * FROM messages ORDER BY timestamp DESC LIMIT $1 OFFSET $2;`;
    try {
      const res = await client.query(query, [limit, offset]);
      console.log("20")

      return res.rows;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

