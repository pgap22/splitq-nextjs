"use server";

import prisma from "@/db/prisma";
import { authUser } from "@/lib/authUser";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { revalidatePath } from "next/cache";

// Configura dayjs con los plugins necesarios
dayjs.extend(utc);
dayjs.extend(timezone);

export async function cancelRefoundById(id) {
    try {
        const { id: id_user } = await authUser();

        const refound = await prisma.userRefoundBalance.update({
            where: {
                id,
                id_user,
                status: "pending"
            },
            data: {
                status: 'canceled',
                checkedAt: dayjs().tz("America/El_Salvador").toDate()
            }
        });

        await prisma.users.update({
            where: {
                id: id_user
            },
            data: {
                freezebalance: {
                    decrement: refound.refoundBalance
                },
                balance: {
                    increment: refound.refoundBalance
                }
            }
        });

        revalidatePath("/");
        return refound;
    } catch (error) {
        console.log(error);
        return { error: "Hubo un error en el servidor" };
    }
}
