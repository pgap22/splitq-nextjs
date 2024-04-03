"use server"
import prisma from "@/db/prisma";
import { generarCodigoVerificacion } from "@/lib/code";
import { sendVerificationEmail } from "@/lib/email";
import { getUserByEmail, getUserVerifiedByEmail } from "@/lib/user";
import bcryptjs from "bcryptjs"
export async function createUser(data) {
    if (!data.name || !data.email || !data.password) return { error: "Campos vacios" }
    
    const userExistEmail = await getUserVerifiedByEmail(data.email);
    
    if(userExistEmail) return { error: "Ya existe ese usuario con ese correo" }

    const passwordHash = await bcryptjs.hash(data.password, 5);

    const isNotUser = !!data.role
    
    const code  =  generarCodigoVerificacion(6)

    sendVerificationEmail(data.email, code);

    // const user = await prisma.users.create({
    //     data: {
    //         ...data,
    //         password: passwordHash,
    //         verification: true,
    //         code
    //     }
    // })

    return true;

}