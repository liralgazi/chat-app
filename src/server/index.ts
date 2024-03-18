import express from 'express';
import cors from 'cors';
import routes from './routes'; 
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {});

io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Update this to receive the message data
    socket.on('message', (message) => {
      console.log("Message received: ", message);
      // Broadcast the message to all clients
      io.emit('message', message);
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
app.use(express.json());
app.use('/api', routes);
const corsOptions = {
    origin: '*', 
    allowedHeaders: ['Content-Type'], 
  };

  app.use(cors(corsOptions));
server.listen(3002, () => {
  console.log("Server started on port 3002");
});
