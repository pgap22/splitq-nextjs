"use server";

import prisma from "@/db/prisma";

export async function getTicketById(id) {
  try {
    const ticket = await prisma.cartUserProducts.findFirst({
      where: {
        id,
        ticket_enabled: true,
      },
      include: {
        user: true,
        combo: {
          include: {
            seller: true,
          },
        },
        product: {
          include: {
            seller: true,
          },
        },
      },
    });


    if (ticket && ticket.combo) {
      ticket.product = { ...ticket.combo };
      delete ticket.combo;
    }
    return ticket;
  } catch (error) {
    console.log(error);
    return { error: "Hubo un error en el servidor" };
  }
}
