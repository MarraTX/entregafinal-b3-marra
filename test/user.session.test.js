import { expect } from "chai";
import { describe, it, before, after } from "mocha";
import supertest from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";

//* Para mantener la validación estricta de consultas
mongoose.set("strictQuery", true);

// URL de conexión a la base de datos de testing
const MONGO_URI =
  "mongodb://localhost:27017/mocksGeneratorTest?directConnection=true";

// Instancia de supertest apuntando a tu servidor
// const request = supertest("http://localhost:8080");
const request = supertest(app);

describe("Testing users Api", function () {
  // Aumenta el timeout por si la conexión es lenta
  this.timeout(6000);

  // Variables para usar entre tests
  before(async function () {
    // Conexión a MongoDB antes de correr los tests
    await mongoose
      .connect(MONGO_URI)
      .then(() => {
        console.log("Connected to MongoDB for testing");
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB for testing:", err);
      });
    // Usuario de prueba
    this.mockUser = {
      first_name: "Usuario de prueba 2",
      last_name: "Apellido de prueba 2",
      email: "correodeprueba2@gmail.com",
      password: "123456",
    };
    this.cookie = null;

    this.mockPet = {
      name: "Firulais",
      specie: "Perro",
      birthDate: "2020-01-01",
      adopted: false,
      owner: null,
      image: [],
    };
  });

  after(async function () {
    // Limpia la colección de usuarios después de correr los tests
    await mongoose.connection.collection("users").deleteMany({
      email: this.mockUser.email,
    });

    // Limpia la colección de mascotas después de correr los tests
    await mongoose.connection.collection("pets").deleteMany({
      name: this.mockPet.name,
    });

    // Cierra la conexión a MongoDB después de correr todos los tests
    await mongoose.connection.close();
  });

  // Test 01 - Registro de un User
  it("Test Registro Usuario: Debe poder registrar correctamente un usuario", async function () {
    const { statusCode } = await request
      .post("/api/auth/register")
      .send(this.mockUser);

    expect(statusCode).to.eql(201);
  });

  // Test 02 - Login de un User
  it("Test Login Usuario: Debe poder hacer login correctamente con el usuario registrado previamente y obtener la cookie", async function () {
    const mockLogin = {
      email: this.mockUser.email,
      password: this.mockUser.password,
    };

    const result = await request.post("/api/auth/login").send(mockLogin);

    console.log("result: ", result.header);
    const cookieResult = result.header["set-cookie"][0];
    const cookieData = cookieResult.split("=");

    this.cookie = {
      name: cookieData[0],
      value: cookieData[1].split(";")[0],
    };
    expect(this.cookie.name).to.eql("token");
    expect(this.cookie.value).to.be.ok;
  });

  it("debe crear una mascota con imagen", async function () {
    const result = await request
      .post("/api/pet/withImage")
      .set("Cookie", `${this.cookie.name}=${this.cookie.value}`)
      .field("name", this.mockPet.name)
      .field("specie", this.mockPet.specie)
      .field("birthDate", this.mockPet.birthDate)
      .attach("image", "./test/files/coderDog.jpg");

    expect(result.status).to.eql(201);
    expect(result.body.status).to.eql("success");
  });
});
