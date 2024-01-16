import supertest from "supertest";
import { app } from "../application/server";

describe('Get Todo List by ID', () => {
    it("Should can get todo list by ID", async () => {
        const result = supertest(app)
        .get('/todolist/:todolistID')
        .query()
    } )
})