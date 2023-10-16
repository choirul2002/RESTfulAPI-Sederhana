import { prismaClient } from "../applications/database.js";
import { ResponseError } from "../error/response-error.js";
import { registerUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import { loginValidation } from "../validation/user-validation.js";
import { v4 as uuid } from "uuid";
import { getUserValidation } from "../validation/user-validation.js";
import { updateUserValidation } from "../validation/user-validation.js";

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Username already exist");
  }

  user.password = await bcrypt.hash(user.password, 10);

  const result = await prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });

  return result;
};

const login = async (request) => {
  const loginRequest = validate(loginValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(400, "Username or password wrong");
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new ResponseError(400, "Username or password wrong");
  }

  const token = uuid().toString();
  const result = await prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      username: user.username,
    },
    select: {
      token: true,
    },
  });

  return result;
};

const userValidation = async (username) => {
  const data = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: data,
    },
    select: {
      username: true,
      name: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  return user;
};

const update = async (request) => {
  const user = validate(updateUserValidation, request);

  const totalUserInDatabase = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (totalUserInDatabase !== 1) {
    throw new ResponseError(404, "User not found");
  }

  const data = {};
  if (user.name) {
    data.name = user.name;
  }

  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }

  const result = await prismaClient.user.update({
    where: {
      username: user.username,
    },
    data: data,
    select: {
      username: true,
      name: true,
    },
  });

  return result;
};

const logout = async (username) => {
  const data = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: data,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  const result = await prismaClient.user.update({
    where: {
      username: username,
    },
    data: {
      token: null,
    },
  });

  return result;
};

export default {
  register,
  login,
  userValidation,
  update,
  logout,
};
