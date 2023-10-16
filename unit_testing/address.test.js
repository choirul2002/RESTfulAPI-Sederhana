import {
  createContact,
  createUser,
  deleteUser,
  deleteAddress,
  deleteContact,
  createAddresses,
} from "./test-util";
import supertest from "supertest";
import { web } from "../src/applications/web.js";
import { logger } from "../src/applications/logging.js";

describe("POST /api/contacts/:contactsId/addresses", () => {
  it("Should can post data address", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);

    const result = await supertest(web)
      .post("/api/contacts/" + contact.id + "/addresses")
      .set("Authorization", "test")
      .send({
        street: "test",
        city: "test",
        province: "test",
        country: "test",
        postal_code: "9999999",
      });

    logger.info(result.body);

    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("test");
    expect(result.body.data.city).toBe("test");
    expect(result.body.data.province).toBe("test");
    expect(result.body.data.country).toBe("test");
    expect(result.body.data.postal_code).toBe("9999999");

    await deleteAddress(result.body.data.id);
    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("Should reject if authorization invalid", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);

    const result = await supertest(web)
      .post("/api/contacts/" + contact.id + "/addresses")
      .set("Authorization", "testaaa")
      .send({
        street: "test",
        city: "test",
        province: "test",
        country: "test",
        postal_code: "9999999",
      });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();

    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("Should reject if request invalid", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);

    const result = await supertest(web)
      .post("/api/contacts/" + contact.id + "/addresses")
      .set("Authorization", "test")
      .send({
        street: "",
        city: "",
        province: "",
        country: "",
        postal_code: "",
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();

    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("Should reject if params contactId invalid", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);

    const result = await supertest(web)
      .post("/api/contacts/" + (contact.id + 1) + "/addresses")
      .set("Authorization", "test")
      .send({
        street: "test",
        city: "test",
        province: "test",
        country: "test",
        postal_code: "9999999",
      });

    logger.info(result.body);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();

    await deleteContact(contact.id);
    await deleteUser(user.username);
  });
});

describe("GET /api/contacts/:contactsId/addresses/:addressId", () => {
  it("Should can get data addresses", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const addresses = await createAddresses(contact.id);

    const result = await supertest(web)
      .get("/api/contacts/" + contact.id + "/addresses/" + addresses.id)
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();

    await deleteAddress(addresses.id);
    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("Should reject if authorization invalid", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const addresses = await createAddresses(contact.id);

    const result = await supertest(web)
      .get("/api/contacts/" + contact.id + "/addresses/" + addresses.id)
      .set("Authorization", "testaaa");

    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();

    await deleteAddress(addresses.id);
    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("Should reject if contactId invalid", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const addresses = await createAddresses(contact.id);

    const result = await supertest(web)
      .get("/api/contacts/" + (contact.id + 1) + "/addresses/" + addresses.id)
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();

    await deleteAddress(addresses.id);
    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("Should reject if addressId invalid", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const addresses = await createAddresses(contact.id);

    const result = await supertest(web)
      .get("/api/contacts/" + contact.id + "/addresses/" + (addresses.id + 1))
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();

    await deleteAddress(addresses.id);
    await deleteContact(contact.id);
    await deleteUser(user.username);
  });
});

describe("PUT /api/contacts/:contactsId/addresses/:addressId", () => {
  it("Should can update data address", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const address = await createAddresses(contact.id);

    const result = await supertest(web)
      .put("/api/contacts/" + contact.id + "/addresses/" + address.id)
      .set("Authorization", "test")
      .send({
        street: "hallo",
        city: "hallo",
        province: "hallo",
        country: "hallo",
        postal_code: "11111",
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("hallo");
    expect(result.body.data.city).toBe("hallo");
    expect(result.body.data.province).toBe("hallo");
    expect(result.body.data.country).toBe("hallo");
    expect(result.body.data.postal_code).toBe("11111");

    await deleteAddress(address.id);
    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("Should reject if authorization invalid", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const address = await createAddresses(contact.id);

    const result = await supertest(web)
      .put("/api/contacts/" + contact.id + "/addresses/" + address.id)
      .set("Authorization", "testaaa")
      .send({
        street: "hallo",
        city: "hallo",
        province: "hallo",
        country: "hallo",
        postal_code: "11111",
      });

    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();

    await deleteAddress(address.id);
    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("Should reject if request invalid", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const address = await createAddresses(contact.id);

    const result = await supertest(web)
      .put("/api/contacts/" + contact.id + "/addresses/" + address.id)
      .set("Authorization", "test")
      .send({
        street: "",
        city: "",
        province: "",
        country: "",
        postal_code: "",
      });

    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();

    await deleteAddress(address.id);
    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("Should reject if contactId invalid", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const address = await createAddresses(contact.id);

    const result = await supertest(web)
      .put("/api/contacts/" + (contact.id + 1) + "/addresses/" + address.id)
      .set("Authorization", "test")
      .send({
        street: "hallo",
        city: "hallo",
        province: "hallo",
        country: "hallo",
        postal_code: "11111",
      });

    logger.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();

    await deleteAddress(address.id);
    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("Should reject if addressId invalid", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const address = await createAddresses(contact.id);

    const result = await supertest(web)
      .put("/api/contacts/" + contact.id + "/addresses/" + (address.id + 1))
      .set("Authorization", "test")
      .send({
        street: "hallo",
        city: "hallo",
        province: "hallo",
        country: "hallo",
        postal_code: "11111",
      });

    logger.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();

    await deleteAddress(address.id);
    await deleteContact(contact.id);
    await deleteUser(user.username);
  });
});

describe("DELETE /api/contacts/:contactsId/addresses/:addressId", () => {
  it("Should can delete data address", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const address = await createAddresses(contact.id);

    const result = await supertest(web)
      .delete("/api/contacts/" + contact.id + "/addresses/" + address.id)
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("Should rejecy if authorization invalid", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const address = await createAddresses(contact.id);

    const result = await supertest(web)
      .delete("/api/contacts/" + contact.id + "/addresses/" + address.id)
      .set("Authorization", "testaaa");

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();

    await deleteAddress(address.id);
    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("Should reject if contactId invalid", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const address = await createAddresses(contact.id);

    const result = await supertest(web)
      .delete("/api/contacts/" + (contact.id + 1) + "/addresses/" + address.id)
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();

    await deleteAddress(address.id);
    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("Should reject if addressId invalid", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const address = await createAddresses(contact.id);

    const result = await supertest(web)
      .delete("/api/contacts/" + contact.id + "/addresses/" + (address.id + 1))
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();

    await deleteAddress(address.id);
    await deleteContact(contact.id);
    await deleteUser(user.username);
  });
});

describe("GET /api/contacts/:contactsId/addresses", () => {
  it("Should can get data address", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const address = await createAddresses(contact.id);

    const result = await supertest(web)
      .get("/api/contacts/" + contact.id + "/addresses")
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(200);

    await deleteAddress(address.id);
    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("Should reject if contactId invalid", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const address = await createAddresses(contact.id);

    const result = await supertest(web)
      .get("/api/contacts/" + (contact.id + 1) + "/addresses")
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();

    await deleteAddress(address.id);
    await deleteContact(contact.id);
    await deleteUser(user.username);
  });

  it("Should reject if authorization invalid", async () => {
    const user = await createUser();
    const contact = await createContact(user.username);
    const address = await createAddresses(contact.id);

    const result = await supertest(web)
      .get("/api/contacts/" + contact.id + "/addresses")
      .set("Authorization", "testaaaa");

    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();

    await deleteAddress(address.id);
    await deleteContact(contact.id);
    await deleteUser(user.username);
  });
});
