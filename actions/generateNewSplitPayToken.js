"use server";

import prisma from "@/db/prisma";
import { generarCodigoVerificacion } from "@/lib/code";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
export const generateNewSplitPayToken = async (id) => {
  const key = generarCodigoVerificacion(6);
  await prisma.splitPay.update({
    where: {
      id,
    },
    data: {
      key,
      status: 'not_configured'
    },
  });
  revalidatePath("/admin/splitpay", "page")
  const token = jwt.sign({ key }, process.env.JWT_SPLITPAY_SECRET);
  return token;
};
