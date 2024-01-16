import { prismaClient } from "../application/prisma-client.js";

const removeAllTodoList = async () => {
    await prismaClient.todolist.deleteMany({});
};

const createManyTodo = async () => {
    await prismaClient.todolist.createMany({
        data: [
            {
                title: "Belajar mysql",
                description: "Belajar mysql dengan sungguh, sungguh",
                priority: 3
            },
            {
                title: "Belajar memahami masa depan",
                description: "Belajar untuk memahami masa depan ya",
                priority: 1
            },
            {
                title: "Membeli buku atomic habits",
                description: "Beli buku atomic habits atau ga ya pinjem aja",
                priority: 2
            },
            {
                title: "Belajar Fisika",
                description: "Belajar fisika dari dosen unsikuy",
                priority: 4
            }
        ]
    })
}

export {
    removeAllTodoList,
    createManyTodo
}