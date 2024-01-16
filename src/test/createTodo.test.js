import supertest from "supertest";
import { app } from "../application/server";
import { createManyTodo, removeAllTodoList } from "./test-util.js";

describe("Create Todo", () => {
    afterEach(async () => {
        removeAllTodoList();
    });
    it("Should can create todo list", async () => {

        const result = await supertest(app)
        .post('/todolist')
        .send({
            title: "Belajar membuat Contact API",
            description: "Belajar membuat contact api menggunakan express dan database mysql",
            priority: 5
        });

        expect(result.status).toBe(200);
        expect(result.body.data.title).toContain('Belajar membuat Contact API');

    });

    it("Should reject if format requset is invalid", async () => {
        const result = await supertest(app)
        .post('/todolist')
        .send({
            title: 'a',
            description: "ini boleh null",
            priority: 6
        })

        expect(result.status).toBe(400);
        expect(result.text).toContain('"title" length must be at least 2 characters long');
        expect(result.text).toContain('"priority" must be less than or equal to 5');

    })
})

describe("Get Null Todo List", () => {

    it("Should can confirm that theres no todolist in database", async () => {
        const result = await supertest(app)
        .get('/todolist');

        expect(result.text).toContain('Theres no Todos yet. Try to create one!')
    });
    
});

describe('Get All Todo List', () => {
    beforeEach(async () => {
        createManyTodo();
    });

    it("Should can show all todos", async () => {
        const result = await supertest(app)
        .get('/todolist');

        for (let todos of result.body) {
            expect(todos.id).toBeUndefined();
            expect(todos.title).toBeDefined();
            expect(todos.description).toBeDefined();
            expect(todos.priority).toBeDefined();
        }
    });
});

