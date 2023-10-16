import { web } from "../src/applications/web.js";
import supertest from "supertest";
import { logger } from "../src/applications/logging.js";
import { createUser, deleteUser } from "./test-util.js";
import { prismaClient } from "../src/applications/database.js";

describe("POST /api/users", function () {
  it("should can register now", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "huda@gmail.com",
      password: "rahasia",
      name: "huda ahmad",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("huda@gmail.com");
    expect(result.body.data.name).toBe("huda ahmad");

    await deleteUser(result.body.data.username);
  });
});

describe("POST /api/users/login", () => {
  it("login succesfully ", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "huda@gmail.com",
      password: "rahasia",
      name: "choirul huda",
    });

    const user = result.body.data.username;

    result = await supertest(web).post("/api/users/login").send({
      username: "huda@gmail.com",
      password: "rahasia",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    await deleteUser(user);
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "",
      password: "",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if request is wrong", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "huda@gmail.com",
      password: "rahasia",
      name: "choirul huda",
    });

    const user = result.body.data.username;

    result = await supertest(web).post("/api/users/login").send({
      username: "huda@gmail.com",
      password: "raha",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();

    await deleteUser(user);
  });
});

describe("GET /api/users/current", () => {
  it("should can get current user", async () => {
    const user = await createUser();
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("huda@gmail.com");
    expect(result.body.data.name).toBe("choirul huda");
    await deleteUser(user.username);
  });

  it("should reject if token is invalid", async () => {
    const user = await createUser();
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "salah");

    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
    await deleteUser(user.username);
  });
});

describe("UPDATE /api/users/current", () => {
  it("should update data is succesfully", async () => {
    const user = await createUser();
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "huda choirul",
        password: "admin",
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe("huda choirul");
    await deleteUser(user.username);
  });

  it("should reject if request invalid", async () => {
    const user = await createUser();
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "",
        password: "",
      });

    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
    await deleteUser(user.username);
  });

  it("should reject if authorization false", async () => {
    const user = await createUser();
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", false)
      .send({
        name: "huda choirul",
        password: "admin",
      });

    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
    await deleteUser(user.username);
  });
});

describe("DELETE /api/users/logout", () => {
  it("should can logout user", async () => {
    const user = await createUser();
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    const cekToken = await prismaClient.user.findUnique({
      where: {
        username: "huda@gmail.com",
      },
      select: {
        token: true,
      },
    });

    expect(cekToken.token).toBe(null);
    await deleteUser(user.username);
  });
});
