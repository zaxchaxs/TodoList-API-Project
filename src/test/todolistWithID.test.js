import supertest from "supertest";
import { app } from "../application/server.js";
import { createManyTodo, createTestTodo, removeAllTodoList, resetAutoIncrement } from "./test-util.js";

describe('Get Todo List by ID', () => {
    beforeEach(async () => {
        // await removeAllTodoList();
        await createManyTodo();
    });

    afterEach(async () => {
        await removeAllTodoList();
    });

    it("Should can get todo list by ID", async () => {
        const testTodo = await createTestTodo();
        const result = await supertest(app)
        .get(`/todolist/` + testTodo.id); // Id should be 6675


        expect(result.status).toBe(200);
        expect(result.body.title).toBe('Testing todo');
        expect(result.body.description).toBe("Testing todo untuk cek apakah bisa get by id");
        expect(result.body.priority).toBe(5);
    });

    it("Should error because id is invalid/not found", async () => {
        const result = await supertest(app)
        .get('/todolist/12345') //ID is not found
    
        expect(result.status).toBe(404);
        expect(result.body.errors).toBe('To-Do List is not found / existing')

    });
});

describe("Update todo list", () => {
    beforeEach(async () => {
        await createManyTodo();
    });
    afterEach(async () => {
        await removeAllTodoList();
    })

    it("Should can update todolist with id 6675", async () => {
        const testTodo = await createTestTodo();
        const updateTodo = {
            title : "New Testing Todo",
            description: "Lorem Ipsum dolor amet",
            priority: 3
        };

        const result = await supertest(app)
        .put('/todolist/' + testTodo.id)
        .send(updateTodo);

        expect(result.status).toBe(200);
        expect(result.body.data.title).toBe("New Testing Todo");
        expect(result.body.data.description).toBe("Lorem Ipsum dolor amet");
        
    })

    it("Should can throw error message from validation", async () => {
        const testTodo = await createTestTodo();
        const wrongUpdateTodo = {
            title: "A",
            description: "",
            priority: 10,
        };

        const result = await supertest(app)
            .put('/todolist/' + testTodo.id)
            .send(wrongUpdateTodo);

            expect(result.status).toBe(400);
            expect(result.body.errors).toContain('"title" length must be at least 2 characters long');
            expect(result.body.errors).toContain('"priority" must be less than or equal to 5');
    });

    it("Should throw error because todolist ID is invalid/not found", async () => {
        const updateTodo = {
            title : "New Testing Todo",
            description: "Lorem Ipsum dolor amet",
            priority: 3
        };

        const result = await supertest(app)
        .put('/todolist/12345') //invalid ID
        .send(updateTodo);

        expect(result.status).toBe(404);
        expect(result.body.errors).toBe("To-Do List is not found / existing");
    });
});

describe('Delete Todo List', () => {
    afterEach(async () => {
        await removeAllTodoList();
    })
    it('should can delete existing todolist', async () => {
        const testTodo = await createTestTodo();
        const result = await supertest(app)
            .delete('/todolist/' + testTodo.id)
        
        expect(result.status).toBe(200);
        expect(result.body.message).toBe(`To-Do List Deleted`)
    });
    
    it("Should cannot delete todolist because id todolist is not existing/invalid id", async () => {
        const result = await supertest(app)
            .delete('/todolist/12345');

            expect(result.status).toBe(404);
            expect(result.body.errors).toBe("To-Do List is not found / existing");
    });
});