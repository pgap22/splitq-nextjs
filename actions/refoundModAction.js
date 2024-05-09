"use server";

import prisma from "@/db/prisma";
import { authUser } from "@/lib/authUser";
import { revalidatePath } from "next/cache";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc);
dayjs.extend(timezone);

export async function refoundModAction(action, id) {
  try {
    const userMod = await authUser();
    if (action == "accepted") {
      const refoundUpdated = await prisma.userRefoundBalance.update({
        where: {
          id,
          status: "pending",
        },
        data: {
          status: "accepted",
          id_mod: userMod.id,
          checkedAt: dayjs().tz("America/El_Salvador").toDate(),
        },
      });

      await prisma.users.update({
        where: {
          id: refoundUpdated.id_user,
        },
        data: {
          freezebalance: {
            decrement: refoundUpdated.refoundBalance,
          },
        },
      });
    }

    if (action == "denied") {
      const refoundUpdated = await prisma.userRefoundBalance.update({
        where: {
          id,
          status: "pending",
        },
        data: {
          status: "denied",
          id_mod: userMod.id,
          checkedAt: dayjs().tz("America/El_Salvador").toDate(),
        },
      });

      await prisma.users.update({
        where: {
          id: refoundUpdated.id_user,
        },
        data: {
          freezebalance: {
            decrement: refoundUpdated.refoundBalance,
          },
          balance: {
            increment: refoundUpdated.refoundBalance,
          },
        },
      });
    }

    revalidatePath("/");
    return true;
  } catch (error) {
    console.log(error);
    return { error: "Hubo un error en el servidor" };
  }
}
