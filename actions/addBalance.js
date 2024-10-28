"use server";
import prisma from "@/db/prisma";
import { authUser } from "@/lib/authUser";
import { sumDecimal } from "@/lib/decimal";
import { revalidatePath } from "next/cache";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Extiende dayjs con los plugins necesarios
dayjs.extend(utc);
dayjs.extend(timezone);

export default async function addBalance(userID, newBalance) {
    try {
        const currentMod = await authUser();
        const [_, user] = await Promise.all([
            prisma.recharges.create({
                data: {
                    userID: userID,
                    modID: currentMod.id,
                    balance: newBalance,
                    createdAt: dayjs().tz("America/El_Salvador").toDate()
                }
            }),
            prisma.users.findFirst({
                where: {
                    id: userID,
                },
            })
        ]);

        await prisma.users.update({
            where: {
                id: userID
            },
            data: {
                balance: sumDecimal(newBalance, user.balance)
            }
        });
        
        revalidatePath("/mod/user/" + userID);
        return true;
    } catch (error) {
        console.log(error);
        return { error: "Hubo un error con el servidor" };
    }
}
