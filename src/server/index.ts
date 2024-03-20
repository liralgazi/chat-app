import express from 'express';
import cors from 'cors';
import routes from './routes'; 
import http from 'http';
import { Server } from 'socket.io';
import { saveMessage, getAllMessages } from '../server/config/db'; // Adjust path as necessary
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const server = http.createServer(app);
const io = new Server(server, {});
app.use(express.json());
app.use('/api', routes);

const corsOptions = {
    origin: '*', 
    allowedHeaders: ['Content-Type'], 
  };

app.use(cors(corsOptions));
const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


io.on('connection', async (socket) => {
    console.log('A user connected');
    try {
        const messages = await getAllMessages();
        io.emit('allMessages', messages)
    } catch (err) {
        console.log(err)
    }

    socket.on('message', async (message) => {
        //console.log("Message received: ", message);
        await saveMessage(message);
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
app.get('/api/messages', async (req, res) => {
    const messages = await getAllMessages();
    res.json(messages);
});
