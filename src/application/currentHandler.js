// import { createTodoListValidation } from "../validation/validation.js"
// import { prismaClient } from "./prisma-client.js";


// const createTodo = async (req) => {
//     const todo = createTodoListValidation.validate(req, {
//         abortEarly: false,
//     });

//     if (todo.error) {

//     } else {
//         // res.status(200)
//         const result = await prismaClient.todolist.create({
//             data: todo.value,
//             select: {
//                 title: true,
//                 description: true,
//             }
//         });
//         return result;
//     };
// }

// export default { 
//     createTodo
// }