import express from 'express';
import { createTodo } from './handler.js';

export const app = express();
const router = express.Router();


app.use(express.json());
// app.use(router);
app.route('/todolist')
    .get((req, res) => {
        res.send('Testing')
    })
    .post(createTodo);
// app.use();

