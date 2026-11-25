import prisma from "../../../lib/prisma.js"


export const createRuleDb = async (name:string, description:string) => {
  const result = await prisma.rules.create({ data: { name, description } });

  if (result) {
    return result
  }

  return null
}
