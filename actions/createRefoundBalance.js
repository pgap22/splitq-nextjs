"use server";

import prisma from "@/db/prisma";
import { authUser } from "@/lib/authUser";
import { revalidatePath } from "next/cache";

export async function createRefoundBalance(data) {
  try {
    const { id } = await authUser();
    data.id_user = id;

    const [user, refound] = await Promise.all([
      prisma.users.update({
        where: {
          id,
        },
        data: {
          freezebalance: {
            increment: data.refoundBalance,
          },
          balance: {
            decrement: data.refoundBalance,
          },
        },
      }),

      prisma.userRefoundBalance.create({
        data,
      }),

    ]);

    revalidatePath("/")

    return true;
  } catch (error) {
    console.log(error);
    return { error: "Hubo un error con el servidor" };
  }
}
