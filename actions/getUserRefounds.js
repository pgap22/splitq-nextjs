"use server";

import prisma from "@/db/prisma";
import { authUser } from "@/lib/authUser";

export async function getUserRefounds() {
  try {
    const { id } = await authUser();
    const refounds = await prisma.userRefoundBalance.findMany({
      where: {
        AND: [
          {
            id_user: id,
          }
        ],
      },
    });
    return refounds;
  } catch (error) {
    console.log(error);
    return { error: "Hubo un error en el servidor" };
  }
}
