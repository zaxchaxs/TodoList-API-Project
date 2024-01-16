import express from 'express';
import { createTodo } from './middlewares';

const router = express.Router();
const mainPath = '/todolist';
const todolistID = '/todolist/{ID}'

router.post(mainPath, createTodo);

export {
    router
}