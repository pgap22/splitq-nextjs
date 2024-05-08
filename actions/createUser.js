"use server"
import prisma from "@/db/prisma";
import { generarCodigoVerificacion } from "@/lib/code";
import { sendVerificationEmailApi } from "@/lib/emailAPI";
import { getUserByEmail } from "@/lib/user";
import bcryptjs from "bcryptjs"
export async function createUser(data) {
    if (!data.name || !data.email || !data.password) return { error: "Campos vacios" }
    
    const userExistEmail = await getUserByEmail(data.email);
    
    if(userExistEmail && !userExistEmail.token) return { error: "Ya existe ese usuario con ese correo" }

    const passwordHash = await bcryptjs.hash(data.password, 5);

    const isNotUser = !!data.role

    const test = process.env.DEPLOYMENT
    
    let code  =  generarCodigoVerificacion()

    if(test == "local" || isNotUser){
        code = ''
    }
    
    const user = await prisma.users.create({
        data: {
            ...data,
            password: passwordHash,
            token: code
        }
    })
    
    if(test != "local"){
        await sendVerificationEmailApi(user.id);
    }

    if(test == "local"){
        user.local = true
    }

    return user;

}