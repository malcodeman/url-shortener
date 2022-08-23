import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const defaultExport = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method, query } = req;
    switch (method) {
      case "GET":
        await prisma.$connect();
        const id = query.id;
        if (typeof id === "string") {
          const url = await prisma.url.findUnique({
            where: {
              id,
            },
          });
          if (url) {
            return res.status(200).json(url);
          }
          return res.status(404).send("URL not found!");
        }
        return res.status(404).send("URL not found!");
      default:
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch {
    await prisma.$disconnect();
    return res.status(500).send("Something broke!");
  }
};

export default defaultExport;
