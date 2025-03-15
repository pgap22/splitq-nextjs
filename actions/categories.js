import prisma from "@/db/prisma"

export async function getCategories(){
    const categories = await prisma.categories.findMany()
    return categories
}
