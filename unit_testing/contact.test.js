import {
  createContact,
  createUser,
  deleteContact,
  deleteUser,
  getContactById,
} from "./test-util";
import supertest from "supertest";
import { logger } from "../src/applications/logging.js";
import { web } from "../src/applications/web.js";

describe("POST /api/contacts", () => {
  it("should can post contact", async () => {
    const user = await createUser();
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "ahmad",
        last_name: "choirul",
        email: "ahshkj@gmail.com",
        phone: "84705304",
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("ahmad");
    expect(result.body.data.last_name).toBe("choirul");
    expect(result.body.data.email).toBe("ahshkj@gmail.com");
    expect(result.body.data.phone).toBe("84705304");

    await deleteContact(result.body.data.id);
    await deleteUser(user.username);
  });

  it("should can reject if request invalid", async () => {
    const user = await createUser();
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "",
        last_name: "choirul",
        email: "ahshkj@gmail.com",
        phone: "8470530445643656456454563454534536453",
      });

    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();

    await deleteUser(user.username);
  });

  it("should can reject if permission invalid", async () => {
    const user = await createUser();
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "")
      .send({
        first_name: "",
        last_name: "choirul",
        email: "ahshkj@gmail.com",
        phone: "8470530445643656456454563454534536453",
      });

    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();

    await deleteUser(user.username);
  });
});

describe("GET /api/contacts/:contactsId", () => {
  it("should can get data contact by id", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const contactById = await getContactById(contact.id);
    const result = await supertest(web)
      .get("/api/contacts/" + contactById.id)
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("ahmad");
    expect(result.body.data.last_name).toBe("choirul");
    expect(result.body.data.email).toBe("ahshkj@gmail.com");
    expect(result.body.data.phone).toBe("84705304");

    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("should reject if authorization invalid", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const contactById = await getContactById(contact.id);
    const result = await supertest(web)
      .get("/api/contacts/" + contactById.id)
      .set("Authorization", "testaa");

    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();

    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("should reject params invalid", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const contactById = await getContactById(contact.id);
    const result = await supertest(web)
      .get("/api/contacts/" + (contactById.id + 1))
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();

    await deleteContact(contact.id);
    await deleteUser(user.username);
  });
});

describe("PUT /api/contacts/:contactsId", () => {
  it("should can update data contacts", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const contactById = await getContactById(contact.id);
    const result = await supertest(web)
      .put("/api/contacts/" + contactById.id)
      .set("Authorization", "test")
      .send({
        first_name: "test",
        last_name: "test",
        email: "test",
        phone: "888888888",
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("test");
    expect(result.body.data.last_name).toBe("test");
    expect(result.body.data.email).toBe("test");
    expect(result.body.data.phone).toBe("888888888");

    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("should can reject if authorization false", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const contactById = await getContactById(contact.id);
    const result = await supertest(web)
      .put("/api/contacts/" + contactById.id)
      .set("Authorization", "testaaaaaa")
      .send({
        first_name: "test",
        last_name: "test",
        email: "test",
        phone: "888888888",
      });

    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();

    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("should reject if request is invalid", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const contactById = await getContactById(contact.id);
    const result = await supertest(web)
      .put("/api/contacts/" + (contactById.id + 1))
      .set("Authorization", "test")
      .send({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      });

    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();

    await deleteContact(contact.id);
    await deleteUser(user.username);
  });
});

describe("DELETE /api/contacts/:contactsId", () => {
  it("should can delete data contacs", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const contactById = await getContactById(contact.id);
    const result = await supertest(web)
      .delete("/api/contacts/" + contactById.id)
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    await deleteUser(user.username);
  });

  it("should reject if paramns is invalid", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const contactById = await getContactById(contact.id);
    const result = await supertest(web)
      .delete("/api/contacts/" + (contactById.id + 1))
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();

    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("should reject if authorization is false", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const contactById = await getContactById(contact.id);
    const result = await supertest(web)
      .delete("/api/contacts/" + contactById.id)
      .set("Authorization", false);

    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();

    await deleteContact(contact.id);
    await deleteUser(user.username);
  });
});

describe("GET /api/contacts", () => {
  it("should can search data contacts", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);

    const result = await supertest(web)
      .get("/api/contacts")
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(200);
    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("should reject if authorization invalid", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);

    const result = await supertest(web)
      .get("/api/contacts")
      .set("Authorization", "testaaa");

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();

    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("should can search data contacts by query", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);

    const result = await supertest(web)
      .get("/api/contacts")
      .set("Authorization", "test")
      .query({
        page: 1,
        size: 2,
        email: "huda",
        name: "choirul",
        phone: "sjkdh",
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    await deleteContact(contact.id);
    await deleteUser(user.username);
  });
});
