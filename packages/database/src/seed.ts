import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
dotenv.config();
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.tea.deleteMany({});
  await prisma.teaUnits.deleteMany({});
  await prisma.transaction.deleteMany({});
  await prisma.transactionDetail.deleteMany({});
  await prisma.event.deleteMany({});
  console.info("Cleared existing data 👍");

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
