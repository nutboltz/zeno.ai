import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
dotenv.config();
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.user.deleteMany({});
  await prisma.originalFile.deleteMany({});
  await prisma.clip.deleteMany({});
  console.info("Cleared existing data 👍");

  // Create users
  await prisma.user.create({
    data: {
      firstName: "Eunice",
      lastName: "Tan",
      primaryEmail: "eunicehx920@gmail.com"
    }
  })

  console.info("Seeded users 👍");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
