import express from 'express';
import api from './api';
import { getAllMessages } from '../config/db';

const router = express.Router();

router.get('/messages', async (req, res) => {
    try{
        const messages = await getAllMessages()
        //res.json(messages);
        res.send(messages);
        
    }catch(err){
        console.log(err)
    }
});


export default router;