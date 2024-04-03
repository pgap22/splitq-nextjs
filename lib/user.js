import prisma from "@/db/prisma"

export async function getUserByEmail(email) {
    const user = await prisma.users.findFirst({
        where: {
            email
        }
    })
    return user
}

export async function getUserVerifiedByEmail(email){
    const user = await prisma.users.findFirst({
        where: {
            AND: [
                {email},
                {token: ''}
            ]
        }
    })
    return user
}

export async function getUserById(id){
    const user = await prisma.users.findFirst({
        where: {
            id
        }
    })
    return user
}

