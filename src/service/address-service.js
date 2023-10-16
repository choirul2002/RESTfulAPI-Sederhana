import { prismaClient } from "../applications/database.js";
import { validate } from "../validation/validation.js";
import { getContactValidation } from "../validation/contact-validation.js";
import { ResponseError } from "../error/response-error.js";
import {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation,
} from "../validation/address-validation.js";

const create = async (user, contactId, request) => {
  contactId = validate(getContactValidation, contactId);

  const totalContactInDatabse = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (totalContactInDatabse !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  const address = validate(createAddressValidation, request);
  address.contact_id = contactId;

  return prismaClient.address.create({
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

const get = async (user, contactId, addressId) => {
  contactId = validate(getContactValidation, contactId);

  const totalContactInDatabse = await prismaClient.contact.findFirst({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (!totalContactInDatabse) {
    throw new ResponseError(404, "contact is not found");
  }

  addressId = validate(getAddressValidation, addressId);

  const address = await prismaClient.address.findFirst({
    where: {
      contact_id: contactId,
      id: addressId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });

  if (!address) {
    throw new ResponseError(404, "address is not found");
  }

  return address;
};

const update = async (user, contactId, request) => {
  contactId = validate(getContactValidation, contactId);

  const totalContactInDatabse = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (totalContactInDatabse !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  const address = validate(updateAddressValidation, request);

  const totalAddressInDatabse = await prismaClient.address.count({
    where: {
      id: address.id,
    },
  });

  if (!totalAddressInDatabse) {
    throw new ResponseError(404, "address is not found");
  }

  return prismaClient.address.update({
    where: {
      id: address.id,
    },
    data: {
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postal_code: address.postal_code,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

const remove = async (user, contactId, addressId) => {
  contactId = validate(getContactValidation, contactId);

  const totalContactInDatabse = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (totalContactInDatabse !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  addressId = validate(getAddressValidation, addressId);

  const totalInDatabase = await prismaClient.address.count({
    where: {
      contact_id: contactId,
      id: addressId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "Address is not found");
  }

  return prismaClient.address.delete({
    where: {
      id: addressId,
    },
  });
};

const list = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const totalContactInDatabse = await prismaClient.address.count({
    where: {
      contact_id: contactId,
    },
  });

  if (totalContactInDatabse !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  return prismaClient.address.findMany({
    where: {
      contact_id: contactId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

export default {
  create,
  get,
  update,
  remove,
  list,
};
