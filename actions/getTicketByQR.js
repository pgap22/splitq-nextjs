"use server";

import prisma from "@/db/prisma";

export async function getTicketByQR(id) {
  try {
    const ticket = await prisma.cartUserProducts.findFirst({
      where: {
        ticket_qr: id,
        ticket_enabled: true,
      },
      include: {
        user: true,
        combo: {
          include: {
            seller: true,
            products: true
          },
        },
        product: {
          include: {
            seller: true,
          },
        },
      },
    });

    if (ticket.combo) {
      ticket.product = {
        ...ticket.combo
      }
    }


    return ticket;
  } catch (error) {
    console.log(error);
    return {
      error: "Hubo un error en el servidor"
    };
  }
}