import express, { json } from 'express';
import createTodoList from './currentHandler.js';
import { createTodoListValidation } from '../validation/validation.js';
import { prismaClient } from './prisma-client.js';

// const app = express();


const createTodo = async (req, res, next) => {

    const todo = createTodoListValidation.validate(req.body, {
        abortEarly: false,
        allowUnknown: false,

    });
    
    if (todo.error) {
        res.status(400).send(todo.error.message);
        console.log(todo.error.message)
    } else {
        res.status(200);
        const result = await prismaClient.todolist.create({
            data: todo.value,
            select: {
                title: true,
                description: true
            }
        });
    };

    // try{
    //     const result = await createTodoList.createTodo(req.body);
    //     res.status(200).json({
    //         data: result
    //     });

    // } catch (e){
    //     console.log(e)
    // }
};


// const errorMiddleware
export {
    createTodo
}