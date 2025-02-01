import * as JWT from "jsonwebtoken";
import { settings } from "./settings/settings";
import * as Bcrypt from "bcrypt";
export const signJWT = async ({
  payload,
  expiresIn,
}: {
  payload: any;
  expiresIn?: "7d" | "30d";
}) => {
  try {
    const token = await JWT.sign(payload, settings.jwtSecret, {
      expiresIn: expiresIn,
    });
    return token;
  } catch (error) {}
};

export const verifyJWT = async (token: string) => {
  try {
    const decoded = await JWT.verify(token, settings.jwtSecret);
    return decoded;
  } catch (error) {}
};

export const hashPassword = async (password: string) => {
  const salt = await Bcrypt.genSalt(10);
  const hashedPassword = await Bcrypt.hash(password, salt);
  return hashedPassword;
};

export const checkPassword = async (
  password: string,
  hashedPassword: string
) => {
  const isMatch = await Bcrypt.compare(password, hashedPassword);
  return isMatch;
};
