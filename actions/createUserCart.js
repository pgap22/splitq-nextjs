"use server";
import prisma from "@/db/prisma";
import { authUser } from "@/lib/authUser";
import { revalidatePath } from "next/cache";

export async function createUserCart(data, type) {
  try {
    const { id } = await authUser();

    const isCartCreated = await prisma.cartUserProducts.findFirst({
      where: {
        AND: [
          {
            id_user: id,
          },
          {
            ticket_enabled: false
          },
          {
            OR: [
              { id_product: data.id_product },
              { id_combo: data.id_product },
            ],
          },
        ],
      },
    });

    if (isCartCreated) {
      await prisma.cartUserProducts.update({
        where: {
          id: isCartCreated.id,
        },
        data: {
          quantity: isCartCreated.quantity + data.quantity,
        },
      });

      revalidatePath("/");
      return true;
    }

    data.id_user = id;
    if(type == "combo"){
       data.id_combo =  data.id_product
       delete data.id_product
    }

    const cartCreated = await prisma.cartUserProducts.create({
      data
    });

    revalidatePath("/");
    return true;
  } catch (error) {
    console.log(error);
    return { error: "Hubo un error en el servidor" };
  }
}
