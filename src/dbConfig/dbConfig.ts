import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// export async function connect() {
//   try {
//     prisma.$connect();
//     return prisma;
//   } catch (error) {
//     console.log("Something went wrong!");
//     console.error(error);
//   }
// }
