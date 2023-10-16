import {
  createContactvalidation,
  getContactValidation,
  searchContentValidation,
  updateContactvalidation,
} from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../applications/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (user, request) => {
  const contact = validate(createContactvalidation, request);
  contact.username = user.username;

  return prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

const get = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.findFirst({
    where: {
      username: user.username,
      id: contactId,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "Contact not found");
  }

  return contact;
};

const update = async (user, request) => {
  const contact = validate(updateContactvalidation, request);

  const totalContact = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contact.id,
    },
  });

  if (totalContact !== 1) {
    throw new ResponseError(404, "Contact id not found");
  }

  return prismaClient.contact.update({
    where: {
      id: contact.id,
    },
    data: {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

const remove = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const totalInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "Contact is not found");
  }

  return prismaClient.contact.delete({
    where: {
      id: contactId,
    },
  });
};

const seacrh = async (user, request) => {
  request = validate(searchContentValidation, request);

  const filter = [];

  // jika tidak menggunakan filter username maka akan menampilkan semua data
  filter.push({
    username: user.username,
  });

  if (request.name) {
    filter.push({
      OR: [
        {
          first_name: {
            contains: request.name,
          },
        },
        {
          last_name: {
            contains: request.name,
          },
        },
      ],
    });
  }

  if (request.email) {
    filter.push({
      email: {
        contains: request.email,
      },
    });
  }

  if (request.phone) {
    filter.push({
      phone: {
        contains: request.phone,
      },
    });
  }

  const skip = (request.page - 1) * request.size;
  const contact = await prismaClient.contact.findMany({
    where: {
      AND: filter,
    },
    take: request.size,
    skip: skip,
  });

  const totalItem = await prismaClient.contact.count({
    where: {
      AND: filter,
    },
  });

  const totalPage = Math.ceil(totalItem / request.size);

  const item = request.page * request.size;
  let hasilItem;

  if (item < totalItem) {
    hasilItem = request.size;
  } else {
    hasilItem = totalItem - (request.page - 1) * request.size;

    if (hasilItem < 0) {
      hasilItem = 0;
    }
  }

  return {
    data: contact,
    paging: {
      page: request.page,
      item: hasilItem,
      total_item: totalItem,
      total_page: totalPage,
    },
  };
};

export default {
  create,
  get,
  update,
  remove,
  seacrh,
};
