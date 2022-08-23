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
        const id = body.alias || nanoid(8);
        const resp = await prisma.url.create({
          data: {
            id,
            originalUrl: body.longUrl,
            clicks: 0,
          },
        });
        return res.status(200).json(resp);
      default:
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    await prisma.$disconnect();
    if (err instanceof Error) {
      return res.status(500).json(err.message);
    }
    return res.status(500).send("Something broke!");
  }
};

export default defaultExport;
