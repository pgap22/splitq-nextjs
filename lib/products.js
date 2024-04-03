import prisma from "@/db/prisma"

export async function getProductByName(name) {
    return (
        await prisma.products.findFirst({ where: { name } })
    )
} 
