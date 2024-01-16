import supertest from "supertest";
import { app } from "../application/server";

describe("Create Todo", () => {
    it("Should can create todo list", async () => {
        const result = await supertest(app)
        .post('/todolist')
        .send({
            title: "Testing",
            description: "asdsadasdasdas",
            priority: 3
        });

        console.log(result.body);
        expect(result.status).toBe(200);
    });

    it("Should reject if requset is invalid", async () => {
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