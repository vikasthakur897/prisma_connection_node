import { PrismaClient } from "@prisma/client";

const prisma  = new PrismaClient();

async function seed() {

    await prisma.user.createMany({
        data: [
            {name : "Alice", email: "Alice@example.com"},
            {name : "john doe", email: "John@example.com"}
        ],
    });

}

seed().then(() => {
    prisma.$disconnect();
})