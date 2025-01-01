"use server";

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Configura dayjs con los plugins necesarios
dayjs.extend(utc);
dayjs.extend(timezone);

export default async function multiConfirmTickets(tickets) {
  try {
    const updatedTickets = await prisma.cartUserProducts.updateMany({
      where: {
        id: {
          in: tickets, 
        },
        refunded: false,
        request_refund: false,
      },
      data: {
        ticket_redeem: true,
        claimedAt: dayjs().tz("America/El_Salvador").toDate(),
      },
    });

    revalidatePath("/");
    return updatedTickets;
  } catch (error) {
    console.log(error);
    return { error: "Hubo un error en el servidor" };
  }
}
