import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/modules/app/app.module";
import { App } from "supertest/types";

interface RegisterResponse {
  id: number;
  email: string;
  firstName: string;
  password?: string;
}

interface LoginResponse {
  token: string;
  id: number;
  email: string;
  firstName: string;
}

describe("AuthModule (e2e)", () => {
  let app: INestApplication;

  const uniqueId = Date.now();
  const testUser = {
    firstName: "IntegrationTest",
    username: `user_${uniqueId}`,
    email: `test_${uniqueId}@example.com`,
    password: "Password123!",
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/auth/register (POST) - should register a new user", async () => {
    const response = await request(app.getHttpServer() as App)
      .post("/auth/register")
      .send(testUser)
      .expect(201);

    const body = response.body as RegisterResponse;

    expect(body.email).toEqual(testUser.email);
    expect(body.firstName).toEqual(testUser.firstName);
    expect(body.password).toBeUndefined();
  });

  it("/auth/login (POST) - should login and return JWT token", async () => {
    const response = await request(app.getHttpServer() as App)
      .post("/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      })
      .expect(200);

    const body = response.body as LoginResponse;

    expect(body.token).toBeDefined();
    expect(body.email).toEqual(testUser.email);
  });

  it("/auth/login (POST) - should fail with wrong password", async () => {
    await request(app.getHttpServer() as App)
      .post("/auth/login")
      .send({
        email: testUser.email,
        password: "wrong_password",
      })
      .expect(401);
  });
});
