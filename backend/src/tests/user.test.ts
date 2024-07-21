import request from "supertest";
import { initApp } from "../app";
import mongoose from "mongoose";
import { Express } from "express";
import User, { IUser } from "../models/user_model";

let app: Express;
let accessToken: string;
let userId: string;

const user: IUser = {
  email: "myUserEmail@gmail.com",
  password: "myPassword123456",
  name: "Lior",
  birthday: "20.12.1995",
  gender: "female",
  mainGoal: "Improve sleep",
  specialDiets: "Gluten-free"
};

const newEmail = "myNewUserEmail@gmail.com"

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
  await User.deleteMany();

  let userResponse = await request(app).post("/auth/register").send(user);
  expect(userResponse.statusCode).toEqual(201);
  userId = userResponse.body._id;
  console.log(`The use Id is ${userId}`);
  const response = await request(app).post("/auth/login").send(user);
  accessToken = response.body.accessToken;
});

afterAll(async () => {
  console.log("afterAll");
  await User.deleteMany();
  await mongoose.connection.close();
});

describe("User tests", () => {
  test("Test Get All Users", async () => {
    const response = await request(app).get('/user')
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    const userResponse = response.body[0];
    expect(userResponse.email).toBe(user.email);
  });

  test("Test get User by email", async () => {
    const response = await request(app)
      .get(`/user?email=${user.email}`)
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    const userResponse = response.body[0];
    expect(userResponse.email).toBe(user.email);
    expect(userResponse.name).toBe(user.name);
  });

  test("Test get User by Id", async () => {
    const response = await request(app)
      .get(`/user?id=${userId}`)
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]._id).toBe(userId);
    expect(response.body[0].email).toBe(user.email);
    expect(response.body[0].name).toBe(user.name);
  });

  test("Test get User by name", async () => {
    const response = await request(app)
      .get(`/user?name=${user.name}`)
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe(user.name);
    expect(response.body[0].email).toBe(user.email);
  });

  test("Test get User by Id", async () => {
    const response = await request(app)
      .get(`/user/${userId}`)
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe(user.email);
    expect(response.body.name).toBe(user.name);
  });

  test("Test update User by Id", async () => {
    let response = await request(app)
      .patch(`/user/${userId}`)
      .set("Authorization", "JWT " + accessToken)
      .send({ email: newEmail});
    expect(response.statusCode).toBe(204);
    let response2 = await request(app).get("/user")
    .set("Authorization", "JWT " + accessToken);
    expect(response2.body.length).toBe(1);
    expect(response2.body[0].email).toBe(newEmail);
    expect(response2.body[0].name).toBe(user.name);
  });

  test("Test delete User by Id", async () => {
    let response = await request(app)
      .delete(`/user/${userId}`)
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe(newEmail);
    expect(response.body.name).toBe(user.name);
    response = await request(app)
      .get(`/user`)
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

});
