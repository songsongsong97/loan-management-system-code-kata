// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { SHEET } from "@/config/sheet";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  let errorMsg = "";
  try {
    const { provider, company, amount } = req.query;
    if (!provider || typeof provider !== "string") {
      errorMsg = "Invalid Application Provider";
      throw new Error(errorMsg);
    }
    if (!company || typeof company !== "string") {
      errorMsg = "Invalid company";
      throw new Error(errorMsg);
    }
    if (!amount || typeof amount !== "string" || parseInt(amount) <= 0) {
      errorMsg = "Invalid loan amount";
      throw new Error(errorMsg);
    }
    const result = SHEET.filter(
      (sheet) => sheet.company === company && sheet.provider === provider
    );
    if (result.length === 0) {
      errorMsg = "Combination of company and provider does not exist.";
      throw new Error(errorMsg);
    }
    const today = new Date();
    const cutOffDate = new Date(
      today.getFullYear() - 1,
      today.getMonth(),
      today.getDate()
    );
    let resultItem = result[0];
    let preAssessment = 20;
    const filteredData = resultItem.data.filter(
      (item) => new Date(item.year, item.month) >= cutOffDate
    );
    const totalProfitOrLoss = filteredData.reduce((total, item) => {
      return total + item.profitOrLoss;
    }, 0);
    const totalAssetsValue = filteredData.reduce((total, item) => {
      return total + item.assetsValue;
    }, 0);
    resultItem.data = filteredData;

    if (totalProfitOrLoss > 0) {
      preAssessment = 60;
    }
    if (totalProfitOrLoss > 0 && totalAssetsValue / 12 > parseInt(amount)) {
      preAssessment = 100;
    }

    res.status(200).json({
      ...resultItem,
      totalAssetsValue: totalAssetsValue,
      totalProfitOrLoss: totalProfitOrLoss,
      preAssessment: preAssessment,
    });
  } catch (error) {
    return res.status(400).json({ message: errorMsg });
  }
}
