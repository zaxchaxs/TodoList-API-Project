import express from 'express';
import { createTodo, deleteTodolist, getAllTodo, getTodoList, updateTodoList } from './handler.js';

export const app = express();

app.use(express.json());

// middleware untuk menangani CORS (Sementara)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.route('/todolist')
    .get(getAllTodo)
    .post(createTodo);

app.route('/todolist/:todolistID')
    .get(getTodoList)
    .put(updateTodoList)
    .delete(deleteTodolist)