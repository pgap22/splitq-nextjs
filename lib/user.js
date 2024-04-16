import prisma from "@/db/prisma"

export async function getUserByEmail(email) {
    try {
        const user = await prisma.users.findFirst({
            where: {
                email
            }
        })
        return user
    } catch (error) {
        console.log(error)
        return false
    }
}


export async function getUserById(id){
    try {
        const user = await prisma.users.findFirst({
            where: {
                id
            }
        })
        return user
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error con el servidor. Recarga la pagina"}
    }
}

