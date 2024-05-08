"use server"

import prisma from "@/db/prisma";
import { authUser } from "@/lib/authUser"

export async function getMyTickets(){
    try {
        const {id} = await authUser();
        const tickets = (await prisma.cartUserProducts.findMany({
            where: {
                AND: [
                    {id_user: id},
                    {ticket_enabled: true}
                ]
            },
            include: {
                product: {
                    include: {
                        images: true,
                        seller: true
                    }
                },
                combo: {
                    include: {
                        seller: true
                    }
                }
            }
        })).map((item) => {
            if (item.combo) {
              item.product = { ...item.combo };
              delete item.combo;
              return item;
            }
            return item;
          })

        if(!tickets.length) return {message: "No tienes tickets !"}

        return tickets;
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error con el servidor"}
    }
}