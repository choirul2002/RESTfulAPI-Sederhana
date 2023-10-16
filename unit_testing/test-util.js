import { prismaClient } from "../src/applications/database.js";
import bcrypt from "bcrypt";

const createUser = async () => {
  return prismaClient.user.create({
    data: {
      username: "huda@gmail.com",
      password: await bcrypt.hash("rahasia", 10),
      name: "choirul huda",
      token: "test",
    },
  });
};

const deleteUser = async (user) => {
  return prismaClient.user.delete({
    where: {
      username: user,
    },
  });
};

const createContact = async (user) => {
  return prismaClient.contact.create({
    data: {
      first_name: "ahmad",
      last_name: "choirul",
      email: "ahshkj@gmail.com",
      phone: "84705304",
      username: user,
    },
  });
};

const deleteContact = async (contactId) => {
  return prismaClient.contact.delete({
    where: {
      id: contactId,
    },
  });
};

const getContactById = async (contactId) => {
  return prismaClient.contact.findUnique({
    where: {
      id: contactId,
    },
  });
};

const createAddresses = async (contactId) => {
  return prismaClient.address.create({
    data: {
      street: "test",
      city: "test",
      province: "test",
      country: "test",
      postal_code: "9999999",
      contact_id: contactId,
    },
  });
};

const deleteAddress = async (addressId) => {
  return prismaClient.address.delete({
    where: {
      id: addressId,
    },
  });
};

export {
  createUser,
  deleteUser,
  createContact,
  deleteContact,
  getContactById,
  deleteAddress,
  createAddresses,
};
