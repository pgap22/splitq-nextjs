"use server"
import { signIn } from "@/auth";
import prisma from "@/db/prisma";

export async function verifyEmailToken(emailToken){

    const userToken = await prisma.users.findFirst({
        where: {
            emailToken
        }
    })


    if(!userToken) return {error: "El token no es valido"}
    
    await prisma.users.update({
        where: {
            id: userToken.id
        },
        data: {
            email: userToken.updatableEmail,
            updatableEmail: '',
            emailToken: '',
        }
    })

    await signIn("credentials", {
        email: userToken.email,
        verificationLogin: true,
        redirect: true
    });

    return true
}