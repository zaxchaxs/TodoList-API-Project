import express from 'express';
import { createTodo, getAllTodo } from './handler.js';

export const app = express();
const router = express.Router();


app.use(express.json());
// app.use(router);
app.route('/todolist')
    .get(getAllTodo)
    .post(createTodo);
// app.use();

app.route('/todolist/:todolistID')
    .get()