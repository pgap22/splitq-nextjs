"use server";

import prisma from "@/db/prisma";
import { getCheckout } from "./getCheckout";
import { revalidatePath } from "next/cache";

export async function buyProducts() {
  try {
    const {enableToBuy, newBalance, user_id} = await getCheckout();


    if(!enableToBuy) return {error: "No cuentas el saldo suficiente para comprar !"}
    
    //enable tickets
    await prisma.cartUserProducts.updateMany({
        where: {
            AND: [{ id_user: user_id }, { enableToBuy: true }, { ticket_enabled: false }],
          },
        data: {
            enableToBuy: false,
            ticket_enabled: true
        }
    })
    
    await prisma.users.update({
        where: {
            id: user_id
        },
        data: {
            balance: newBalance
        }
    })

    revalidatePath("/")
    return true

  } catch (error) {
    console.log(error);
    return { error: "Hubo un error en el servidor" };
  }
}
