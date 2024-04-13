"use server"
import { signIn } from "@/auth";
import prisma from "@/db/prisma";

export async function verifyToken(token) {

    const userToken = await prisma.users.findFirst({
        where: {
            token
        }
    })

    if (!userToken) return { error: "El token no es valido" }

    await prisma.users.update({
        where: {
            id: userToken.id
        },
        data: {
            token: '',
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
                        token: ''
                    }
                }
            ]
        }
    })

    await signIn("credentials", {
        email: userToken.email,
        verificationLogin: true,
        redirect: true
    });

    return true
}