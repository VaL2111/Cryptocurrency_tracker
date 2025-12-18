import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/modules/app/app.module";
import { App } from "supertest/types";

interface LoginResponse {
  token: string;
}

interface UserResponse {
  id: number;
  firstName: string;
  username: string;
  email: string;
}

describe("UserModule (e2e)", () => {
  let app: INestApplication;
  let token: string;

  const uniqueId = Date.now();
  const testUser = {
    firstName: "UserTester",
    username: `u_user_${uniqueId}`,
    email: `u_test_${uniqueId}@example.com`,
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

    await request(app.getHttpServer() as App)
      .post("/auth/register")
      .send(testUser);

    const loginResponse = await request(app.getHttpServer() as App)
      .post("/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    const body = loginResponse.body as LoginResponse;
    token = body.token;
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it("/users (PATCH) - should update user profile", async () => {
    const updateDto = {
      firstName: "UpdatedName",
      username: `updated_${uniqueId}`,
    };

    const response = await request(app.getHttpServer() as App)
      .patch("/users")
      .set("Authorization", `Bearer ${token}`)
      .send(updateDto)
      .expect(200);

    const body = response.body as UserResponse;

    expect(body.firstName).toEqual(updateDto.firstName);
    expect(body.username).toEqual(updateDto.username);
  });

  it("/users (DELETE) - should delete user account", async () => {
    await request(app.getHttpServer() as App)
      .delete("/users")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    await request(app.getHttpServer() as App)
      .post("/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      })
      .expect(401);
  });
});
