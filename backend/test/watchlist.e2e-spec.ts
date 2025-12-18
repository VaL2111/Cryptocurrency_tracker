import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/modules/app/app.module";
import { App } from "supertest/types";

interface LoginResponse {
  token: string;
  id: number;
  email: string;
}

interface WatchlistResponse {
  id: number;
  name: string;
  assetId: string;
}

describe("WatchlistModule (e2e)", () => {
  let app: INestApplication;
  let token: string;
  let createdAssetId: number;

  const uniqueId = Date.now();
  const testUser = {
    firstName: "WatchlistTester",
    username: `w_user_${uniqueId}`,
    email: `w_test_${uniqueId}@example.com`,
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

  it("/watchlist (POST) - should create a new asset in watchlist", async () => {
    const assetDto = {
      name: "Bitcoin",
      assetId: "bitcoin",
    };

    const response = await request(app.getHttpServer() as App)
      .post("/watchlist")
      .set("Authorization", `Bearer ${token}`)
      .send(assetDto)
      .expect(201);

    const body = response.body as WatchlistResponse;

    expect(body.name).toEqual(assetDto.name);
    expect(body.assetId).toEqual(assetDto.assetId);
    expect(body.id).toBeDefined();

    createdAssetId = body.id;
  });

  it("/watchlist (DELETE) - should delete asset by query id", async () => {
    expect(createdAssetId).toBeDefined();

    const response = await request(app.getHttpServer() as App)
      .delete("/watchlist")
      .set("Authorization", `Bearer ${token}`)
      .query({ id: createdAssetId })
      .expect(200);

    expect(response.text).toBe("true");
  });
});
