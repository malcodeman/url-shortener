import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

const defaultExport = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method, body } = req;
    switch (method) {
      case "POST":
        await prisma.$connect();
        const resp = await prisma.url.create({
          data: {
            id: nanoid(8),
            originalUrl: body.longUrl,
          },
        });
        return res.status(200).json(resp);
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
