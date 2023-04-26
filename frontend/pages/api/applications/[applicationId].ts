// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }
  try {
    const { applicationId } = req.query;
    if (!applicationId || typeof applicationId !== "string") {
      throw new Error("Invalid ID");
    }
    const application = await prisma.application.delete({
      where: {
        id: applicationId,
      },
    });
    res.status(200).json(application);
  } catch (err) {
    return res.status(400).end();
  }
}
