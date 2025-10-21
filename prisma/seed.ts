import { PrismaClient } from "@prisma/client";

const prisma  = new PrismaClient();

async function seed() {

    await prisma.user.createMany({
        data: [
            {name : "Alice", email: "Alice@example.com", password: "alice123"},
            {name : "john doe", email: "John@example.com", password: "john123"},
        ],
    });

}

seed().then(() => {
    prisma.$disconnect();
})