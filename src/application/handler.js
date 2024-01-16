import express, { json } from 'express';
import createTodoList from './currentHandler.js';
import { createTodoListValidation } from '../validation/validation.js';
import { prismaClient } from './prisma-client.js';


const getAllTodo = async (req, res) => {
    
    const result = await prismaClient.todolist.findMany({
        select: {
            title: true,
            description: true,
            priority: true
        }
    });
    if(result.length === 0) {
        res.send('Theres no Todos yet. Try to create one!')
        .status(200);
    } else {
        res.status(200)
        .json(result);
    };
}


const createTodo = async (req, res) => {

    const todo = createTodoListValidation.validate(req.body, {
        abortEarly: false,
        allowUnknown: false,

    });
    
    if (todo.error) {
        res.status(400).send(todo.error.message);
    } else {
        const result = await prismaClient.todolist.create({
            data: todo.value,
            select: {
                title: true,
                description: true,
                priority: true,
            }
        });
        res.status(200)
        .json({
            data: result
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

const getTodoList = async (req, res) => {
    const result = await prismaClient.todolist.findUnique({
        where: {
            // id: req.
        }
    })
}


// const errorMiddleware
export {
    createTodo,
    getAllTodo
}