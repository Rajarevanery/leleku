import { PrismaClient } from "../../generated/prisma";

const db_information = {
  port: process.env.PORT,
  access_jwt_secret: process.env.ACCESS_JWT_SECRET,
};

const { port, access_jwt_secret } = db_information;
const prisma = new PrismaClient();

export { port, access_jwt_secret, prisma };
