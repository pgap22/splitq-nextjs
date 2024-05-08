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
        return {error: true}
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
export async function getUserByPassToken(passToken){
    try {
        const user = await prisma.users.findFirst({
            where: {
                passToken
            }
        })
        if(!user) return null
        return user
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error con el servidor. Recarga la pagina"}
    }
}

