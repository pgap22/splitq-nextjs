"use server"
import prisma from "@/lib/db";
import { getUserByEmail } from "@/lib/user";
import bcryptjs from "bcryptjs"
// import prismaDev from "@/lib/dbDev";
export async function createUser(data) {
    if (!data.name || !data.lastname || !data.email || !data.password) return { error: "Campos vacios" }

    const userExistEmail = await getUserByEmail(data.email);

    if(userExistEmail) return { error: "Ya existe ese usuario con ese correo" }

    const passwordHash = await bcryptjs.hash(data.password, 5);

    const user = await prisma.users.create({
        data: {
            ...data,
            password: passwordHash,
        }
    })

}