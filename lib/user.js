import prisma from "@/lib/db";

// import prismaDev from "@/lib/dbDev";

export async function getUserByEmail(email) {
    const user = await prisma.users.findFirst({
        where: {
            email
        }
    })
    return user
}
