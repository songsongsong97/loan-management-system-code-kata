// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//@ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  let errorMsg = "";
  try {
    const { preAssessment, company, provider, year, profitOrLoss, loanAmount } =
      req.body;
    if (!preAssessment || typeof preAssessment !== "number") {
      errorMsg = "Invalid preAssessment";
      throw new Error(errorMsg);
    } else if (!company || typeof company !== "string") {
      errorMsg = "Invalid company";
      throw new Error(errorMsg);
    } else if (!year || typeof year !== "string") {
      errorMsg = "Invalid year";
      throw new Error(errorMsg);
    } else if (!profitOrLoss || typeof profitOrLoss !== "number") {
      errorMsg = "Invalid profitOrLoss";
      throw new Error(errorMsg);
    } else if (!provider || typeof provider !== "string") {
      errorMsg = "Invalid provider";
      throw new Error(errorMsg);
    } else if (!loanAmount || typeof loanAmount !== "string") {
      errorMsg = "Invalid loan amount";
      throw new Error(errorMsg);
    }

    const randomNumber = Math.random();
    const isApproved = randomNumber <= preAssessment / 100;
    const existingApplication = await prisma.application.findUnique({
      where: {
        company_applicationProvider: { company, applicationProvider: provider },
      },
    });
    if (existingApplication) {
      errorMsg = "Duplicate application";
      throw new Error(errorMsg);
    }
    const application = await prisma.application.create({
      data: {
        company,
        yearEstablished: new Date(year),
        profitOrLoss: profitOrLoss,
        loanAmount: parseInt(loanAmount),
        status: isApproved ? "Approved" : "Rejected",
        applicationProvider: provider,
      },
    });
    res.status(200).json({
      isApproved: isApproved,
      message: "Your application has been submitted.",
      application: application,
    });
  } catch (error) {
    return res.status(400).json({ message: errorMsg });
  }
}
