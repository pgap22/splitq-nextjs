"use server";

import prismaDev from "@/db/prismaDev";
import { getCheckout } from "./getCheckout";
import { revalidatePath } from "next/cache";

export async function buyProducts() {
  try {
    const {enableToBuy, newBalance, user_id} = await getCheckout();


    if(!enableToBuy) return {error: "No cuentas el saldo suficiente para comprar !"}
    
    //enable tickets
    await prismaDev.cartUserProducts.updateMany({
        where: {
            AND: [{ id_user: user_id }, { enableToBuy: true }, { ticket_enabled: false }],
          },
        data: {
            enableToBuy: false,
            ticket_enabled: true
        }
    })
    
    await prismaDev.users.update({
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
