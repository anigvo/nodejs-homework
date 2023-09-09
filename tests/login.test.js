require("dotenv").config();

const supertest = require("supertest");
const mongoose = require("mongoose");
const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const app = require("../app");

mongoose.set("strictQuery", false);

const { DB_TEST_URL } = process.env;

describe("register and login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_URL);
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_URL);
  });

  it("should login user", async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "testUser1@gmail.com",
      password: "123456",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user.email).toEqual(expect.any(String));
    expect(response.body.user.subscription).toEqual(expect.any(String));
    expect(response.body.user.email).not.toBe("");
    expect(response.body.user.subscription).not.toBe("");
    expect(response.body.user).toEqual({
      email: "testUser1@gmail.com",
      subscription: "starter",
    });
  });
    
  it("should not login unknown user", async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "testUser2@gmail.com",
      password: "123456",
    });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Email or password is wrong");
  });
});
