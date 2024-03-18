import { remultExpress } from "remult/remult-express";
import { createPostgresConnection } from "remult/postgres";
import { Message } from './model/MessageModel'
const host = "http://localhost:5000";
export const registerRoute = `${host}/api/auth/register`;


const createConnection = async () => {
    try {
        //create the PostgreSQL connection
        const connection = await createPostgresConnection({
            connectionString: process.env["POSTGRES_STRING"] || "postgres://postgres:la1234@localhost:5432/chat-app",
        });

        console.log("PostgreSQL connection created");

        return connection;
    } catch (error) {
        // Handle any errors that occur during connection setup
        console.error("Error establishing PostgreSQL connection:", error);
        throw error; 
    }
};

const postgresConnection = createConnection();

// Configure the api with remultExpress, using the PostgreSQL connection as the dataProvider
export const api = remultExpress({
    dataProvider: postgresConnection,
    entities: [Message],
});