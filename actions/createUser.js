"use server"
import prisma from "@/db/prisma";
import { generarCodigoVerificacion } from "@/lib/code";
import { sendVerificationEmail } from "@/lib/email";
import { sendVerificationEmailApi } from "@/lib/emailAPI";
import { getUserByEmail } from "@/lib/user";
import bcryptjs from "bcryptjs"
export async function createUser(data) {
    if (!data.name || !data.email || !data.password) return { error: "Campos vacios" }
    
    const userExistEmail = await getUserByEmail(data.email);
    
    if(userExistEmail && !userExistEmail.token) return { error: "Ya existe ese usuario con ese correo" }

    const passwordHash = await bcryptjs.hash(data.password, 5);

    const isNotUser = !!data.role
    
    const code  =  generarCodigoVerificacion()

    
    const user = await prisma.users.create({
        data: {
            ...data,
            password: passwordHash,
            token: isNotUser ? '' : code
        }
    })
    
    sendVerificationEmailApi(user.id);


    return user;

}