import express from 'express';
import { createTodo, deleteTodolist, getAllTodo, getTodoList, updateTodoList } from './handler.js';

export const app = express();

app.use(express.json());

app.route('/todolist')
    .get(getAllTodo)
    .post(createTodo);

app.route('/todolist/:todolistID')
    .get(getTodoList)
    .put(updateTodoList)
    .delete(deleteTodolist)