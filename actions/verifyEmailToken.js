"use server"
import prisma from "@/db/prisma";

export async function verifyEmailToken(emailToken){

    const userToken = await prisma.users.findFirst({
        where: {
            emailToken
        }
    })


    if(!userToken) return {error: "El token no es valido"}
    
    const updatedUser = await prisma.users.update({
        where: {
            id: userToken.id
        },
        data: {
            email: userToken.updatableEmail,
            updatableEmail: '',
            emailToken: '',
        }
    })


    await prisma.users.deleteMany({
        where: {
            AND: [
                {
                    email: userToken.email,
                },
                {
                    NOT: {
                        id: userToken.id
                    }
                }
            ]
        }
    })


    return updatedUser;
}
