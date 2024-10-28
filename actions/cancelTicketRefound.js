"use server";

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";

export async function cancelTicketRefund(id) {
  try {
    await prisma.cartUserProducts.update({
      where: {
        id,
        AND: [{ ticket_enabled: true }, {refund: false}],
      },
      data: {
        request_refund: false,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}
