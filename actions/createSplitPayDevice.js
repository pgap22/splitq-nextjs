"use server";

import prisma from "@/db/prisma";
import { generarCodigoVerificacion } from "@/lib/code";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
export async function createSplitPayDevice(name) {
  const key = generarCodigoVerificacion(6);
  const splitpay = await prisma.splitPay.create({
    data: {
      name,
      key,
    },
  });
  revalidatePath("/admin/splitpay", "page")
  return jwt.sign({ key }, process.env.JWT_SPLITPAY_SECRET);
}
