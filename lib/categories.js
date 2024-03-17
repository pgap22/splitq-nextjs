import prisma from "./db";

export async function getCategorieByName(name) {
    return (
        await prisma.categories.findFirst({ where: { name } })
    )
} 
