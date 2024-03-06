"use server"
import prisma from "@/lib/db";
import { getUserByEmail } from "./user";
// import prismaDev from "@/lib/dbDev";
export async function createUser(data) {
    if (!data.name || !data.lastname || !data.email || !data.password) return { error: "Campos vacios" }

    const userExistEmail = await getUserByEmail(data.email);

    if(userExistEmail) return { error: "Ya existe ese usuario con ese correo" }

    const user = await prisma.users.create({data})

    console.log(user)
}