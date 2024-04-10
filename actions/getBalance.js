"use server"

import prisma from "@/db/prismaDev";
import { authUser } from "@/lib/authUser";

export async function getBalance() {
    const { id } = await authUser();
    const user = await prisma.users.findFirst({
        where: {
            id
        },
        select: {
            balance: true
        }
    })

    return user.balance
}