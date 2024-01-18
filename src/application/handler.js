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
        res.status(404)
            .json({
                errors: "There's no to-do list. Try to create one!"
            });
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
        res.status(400)
            .json({
                errors: todo.error.message,
            });
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
            .json({
                errors: "To-Do List is not found / existing",
            })
    } else{
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
        res.status(404)
            .json({
                errors: "To-Do List is not found / existing"
            })
            .end();
    } else if (updateTodo.error) {
        res.status(400)
        .json({
            errors: updateTodo.error.message 
        })
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
        res.status(404)
            .json({
                errors: "To-Do List is not found / existing"
            });
    } else {
        await prismaClient.todolist.delete({
            where: {
                id: parseInt(req.params.todolistID)
            }
        });

        res.status(200)
            .json({
                message: "To-Do List Deleted"
            });
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