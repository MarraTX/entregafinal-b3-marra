import { expect } from "chai";
import { describe, it, before, after } from "mocha";
import supertest from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";

describe("Testing Adoption API", function () {
  const request = supertest(app);
  this.timeout(6000); // Increase timeout for async operations

  let cookie = null;
  let mockUser = {
    first_name: "UserForAdoptionTest",
    last_name: "LastName",
    email: "adoption.test@example.com",
    password: "123456",
    _id: null, // Will be populated after creation
  };
  let mockPet = {
    name: "PetForAdoption",
    specie: "Dog",
    birthDate: "2022-02-02",
    _id: null, // Will be populated after creation
  };
  let adoptionId = null;

  before(async function () {
    await mongoose.connect("mongodb://localhost:27017/coderhouse-test");
    console.log("Connected to MongoDB for testing");

    // Clean up previous test data
    await mongoose.connection.collection("users").deleteMany({ email: mockUser.email });
    await mongoose.connection.collection("pets").deleteMany({ name: mockPet.name });
    await mongoose.connection.collection("adoptions").deleteMany({});

    // 1. Create user
    const userRes = await request.post("/api/auth/register").send(mockUser);
    mockUser._id = userRes.body.payload._id;

    // 2. Login and get cookie
    const loginRes = await request.post("/api/auth/login").send({ email: mockUser.email, password: mockUser.password });
    const cookieHeader = loginRes.header["set-cookie"][0];
    cookie = cookieHeader.split("=")[1].split(";")[0];

    // 3. Create pet
    const petRes = await request.post("/api/pet").set('Cookie', `token=${cookie}`).send(mockPet);
    mockPet._id = petRes.body.payload._id;
  });

  after(async function () {
    // Clean up all test data
    await mongoose.connection.collection("users").deleteMany({ email: mockUser.email });
    await mongoose.connection.collection("pets").deleteMany({ name: mockPet.name });
    await mongoose.connection.collection("adoptions").deleteMany({});
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  });

  it("POST /api/adoption/createAdoption/:uid/:pid - should create an adoption", async () => {
    const res = await request
      .post(`/api/adoption/createAdoption/${mockUser._id}/${mockPet._id}`)
      .set('Cookie', `token=${cookie}`);
    
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('status', 'success');
    expect(res.body.payload).to.have.property('_id');
    adoptionId = res.body.payload._id; // Save adoptionId for next tests
  });

  it("GET /api/adoption/getAllAdoptions/all - should get all adoptions", async () => {
    const res = await request
      .get("/api/adoption/getAllAdoptions/all")
      .set('Cookie', `token=${cookie}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status', 'success');
    expect(res.body.payload).to.be.an('array').that.is.not.empty;
  });

  it("GET /api/adoption/getOneAdoption/:aid - should get a single adoption by ID", async () => {
    const res = await request
      .get(`/api/adoption/getOneAdoption/${adoptionId}`)
      .set('Cookie', `token=${cookie}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status', 'success');
    expect(res.body.payload).to.have.property('_id', adoptionId);
  });

  it("PUT /api/adoption/updateOneAdoption/:aid/:uid/:pid - should update an adoption", async () => {
    const res = await request
      .put(`/api/adoption/updateOneAdoption/${adoptionId}/${mockUser._id}/${mockPet._id}`)
      .set('Cookie', `token=${cookie}`)
      .send({ status: 'completed' }); // Assuming we can update the status

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status', 'success');
  });

  it("DELETE /api/adoption/deleteOneAdoption/:aid - should delete an adoption", async () => {
    const res = await request
      .delete(`/api/adoption/deleteOneAdoption/${adoptionId}`)
      .set('Cookie', `token=${cookie}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status', 'success');

    // Verify it's actually deleted
    const getRes = await request
      .get(`/api/adoption/getOneAdoption/${adoptionId}`)
      .set('Cookie', `token=${cookie}`);
    expect(getRes.status).to.equal(404); // Assuming it returns 404 Not Found
  });

});
