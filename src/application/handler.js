import express, { json } from 'express';
import createTodoList from './currentHandler.js';
import { createTodoListValidation, updateTodoListValidation } from '../validation/validation.js';
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
        res.status(200).json({
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
            id: parseInt(req.params.todolistID),
        },
        select: {
            title: true,
            description: true,
            priority: true
        }
    });

    if(result === null) {
        res.status(404)
            .send('Todolist is not found. Theres no todolist in database with that id')
    } else{
        console.log(result);
        res.status(200)
            .json(result);
    };
};

const updateTodoList = async (req, res) => {
    const updateTodo = updateTodoListValidation.validate(req.body,
        {
            abortEarly: false,
            allowUnknown: false,
        });
    
    const todoID = await prismaClient.todolist.findUnique({
        where: {
            id: parseInt(req.params.todolistID)
        }
    });

    if(todoID === null) {
        res.status(400).send(`Failed to update. To-Do List ID is not invalid`)
            .end();
    } else if (updateTodo.error) {
        res.status(400).send(updateTodo.error.message);
    } else {
        const result = await prismaClient.todolist.update({
            where: {
                id: parseInt(req.params.todolistID)
            },
            data: updateTodo.value,
            select: {
                title: true,
                description: true,
                priority: true,
            }
        });
        
        res.status(200).json({
            data: result
        })
    };
};


const deleteTodolist =  async (req, res) => {
    const todoID = await prismaClient.todolist.findUnique({
        where: {
            id: parseInt(req.params.todolistID),
        }
    });

    if(todoID === null) {
        res.status(400)
            .send("Failed to delete. To-Do list ID is not invalid")
    } else {
        await prismaClient.todolist.delete({
            where: {
                id: parseInt(req.params.todolistID)
            }
        });

        res.status(200)
            .send("Todo List successfuly deleted");
    }
}

// const errorMiddleware
export {
    createTodo,
    getAllTodo,
    getTodoList,
    updateTodoList,
    deleteTodolist,
}