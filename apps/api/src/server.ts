import app from "./app.js";
import { connectPrisma, disconnectPrisma } from "./lib/prisma.js";

const PORT = process.env.PORT || 3001

async function startServer() {
  await connectPrisma();
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  })
}

process.on('SIGINT', async () => {
  await disconnectPrisma();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await disconnectPrisma();
  process.exit(0);
});

process.on('unhandledRejection', async (error) => {
  console.error("unhandledRejection:", error);
  await disconnectPrisma();
  process.exit(1);
});

process.on('uncaughtException', async (error) => {
  console.error("uncaughtException:", error);
  await disconnectPrisma();
  process.exit(1);
});


startServer()
