import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export async function connectPrisma() {
    try {
        await prisma.$connect();
        console.log("Database connected");
    } catch (error) {
        console.error("Falied to connect database");
        throw new Error("DATABASE_CONNECTION_ERROR");
    }
}

export async function disconnectPrisma() {
    try {
        await prisma.$disconnect();
        console.log("Database disconnected");
    } catch (error) {
        console.error("Falied to disconnect database");
        throw new Error("DATABASE_DISCONNECTION_ERROR");
    }
}
export default prisma;