"use server";

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";

export async function createTicketRefund(id, currentPrice) {
  try {
    await prisma.cartUserProducts.update({
      where: {
        id,
        AND: [{ ticket_enabled: true }],
      },
      data: {
        request_refund: true,
        refoundPrice: currentPrice
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}
