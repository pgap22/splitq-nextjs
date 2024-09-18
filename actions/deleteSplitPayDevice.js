"use server";

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";

export async function deleteSplitPay(id) {
  await prisma.splitPay.delete({
    where: {
      id,
    },
  });
  revalidatePath("/admin/splitpay", "page")
  return true
}
