"use server";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { sumDecimal } from "@/lib/decimal";
import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";

// Extiende dayjs con los plugins necesarios
dayjs.extend(utc);
dayjs.extend(timezone);

export default async function acceptTicketRefund(id, id_user) {
  try {
    const ticketUpdated = await prisma.cartUserProducts.update({
      where: {
        id,
        AND: [
          {
            refunded: false,
          },
          {
            request_refund: true
          }
        ],
      },
      data: {
        refunded: true,
        refundedAt: dayjs().tz("America/El_Salvador").toDate(),
      },
    });

    const { balance } = await prisma.users.findFirst({
        where: {
            id: id_user
        }
    })

    const newBalance = sumDecimal(balance, ticketUpdated.refoundPrice)

    await prisma.users.update({
        where: {
            id: id_user
        },
        data: {
            balance: newBalance
        }
    })

    revalidatePath("/")

  } catch (error) {
    console.log(error)
  }
}
