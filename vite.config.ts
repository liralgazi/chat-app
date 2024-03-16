import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {proxy: {"/api": "http://localhost:3002"}},
})

/*
https://www.youtube.com/watch?v=otaQKODEUFs
https://www.youtube.com/watch?v=VN27pdF3a6c

npm install typescript @types/node
npx tsc --init
npm install express @types/express
npm install --save-dev @babel/core @babel/preset-env @babel/plugin-proposal-decorators
npm install socket.io @types/socket.io
npx ts-node server.ts
npm install bcrypt cors
npm install @types/cors
npm install bcrypt cors dotenv @types/bcrypt @types/cors @types/dotenv
npm install nodemon --save-dev
npm install pg
npm install axios
npm install typeorm @nestjs/typeorm pg


CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    sender_id INTEGER REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO messages (text, sender_id)
VALUES ('Hello, how are you today?', 1);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL CHECK (LENGTH(username) >= 3),
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL CHECK (LENGTH(password) >= 8)
);
INSERT INTO users (username, email, password)
VALUES ('example_user', 'example@example.com', 'password123');
*/