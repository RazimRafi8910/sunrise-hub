import prisma from "../../lib/prisma.js"



export const getRulesFromDb =async (id?: string) => {
  if (id) {
    return await prisma.rules.findFirst({ where: { id } });
  }

  return await prisma.rules.findMany();
}
