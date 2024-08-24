import request from "supertest";
import { initApp } from "../app";
import mongoose from "mongoose";
import weeklyReflection from "../models/weekly_reflection";
import { IReflectionSummery } from "../controllers/weekly_reflection_controller";
import User, { IUser } from "../models/user_model";
import { Express } from "express";
import weekly_reflection from "../models/weekly_reflection";

let app: Express;
let accessToken: string;
let userId: string;

const { ObjectId } = require('mongoose').Types;

beforeAll(async () => {
    app = await initApp();
    console.log("beforeAll");
    await User.deleteMany();
    await weeklyReflection.deleteMany();
  
    let userResponse = await request(app).post("/auth/register").send({
        email: "myUserEmail@gmail.com",
        password: "myPassword123456",
        name: "Lior",
        birthday: "20.12.1995",
        gender: "female",
        mainGoal: "Improve sleep",
        specialDiets: "Gluten-free"
    });

    expect(userResponse.statusCode).toEqual(201);
    userId = userResponse.body._id;  // Use the generated user ID
    console.log(`The use Id is ${userId}`);

    const response = await request(app).post("/auth/login").send({
        email: "myUserEmail@gmail.com",
        password: "myPassword123456"
    });

    accessToken = response.body.accessToken;
});

afterAll(async () => {
    console.log("afterAll");
    await User.deleteMany();
    await mongoose.connection.close();
});

describe("create weekly reflection", () => {
    const addweeklyreflection = async (test_weekly_reflection: IReflectionSummery) => {
        const response = await request(app)
            .post("/weekly_reflection")
            .set("Authorization", "JWT " + accessToken)
            .send(test_weekly_reflection);

        expect(response.statusCode).toBe(201);
        return response.body._id;
    };

    test("Test Get All weekly reflections", async () => {
        const test_weekly_reflection: IReflectionSummery = {
            user_id: userId,  // Use the valid user ID
            feeling: "good",
            pastWeek: "not so good",
            feedbackOnWeeklyPlan: "everything was great"
        };

        test_weekly_reflection._id = await addweeklyreflection(test_weekly_reflection);

        const response = await request(app)
            .get("/weekly_reflection")
            .set("Authorization", "JWT " + accessToken);

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        const weekly_reflection = response.body[0];
        expect(weekly_reflection.user_id).toBe(userId);  // Check against the valid user ID
    });

    // test("Test get weeklyreflection by user", async () => {
    //     console.log("weeklyreflection " + userId);  // Use valid user ID
    //     const response = await request(app)
    //         .get(`/weekly_reflection/${userId}`)  // Use valid user ID
    //         .set("Authorization", "JWT " + accessToken);

    //     expect(response.statusCode).toBe(200);
    //     expect(response.body.length).toBeGreaterThan(0);
    //     response.body.forEach(weekly_reflections => {
    //         expect(weekly_reflections.user_id).toBe(userId);  // Check against valid user ID
    //     });
    // });
});
