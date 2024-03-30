"use server"
import prisma from "@/db/prisma";
// import prismaDev from "@/db/prismaDev";
import { authUser } from "@/lib/authUser";

export default async function getRecharges({take}) {

    try {
        const modUser = await authUser();
        const recharges = await prisma.recharges.findMany({
           where: {
               modID: modUser.id
           },
           take: take+1,
           select: {
                id: true,
                createdAt: true,
                user: {
                    select: {
                        name: true,
                        lastname: true,
                    }
                },
                balance: true
           },
           orderBy: {
            createdAt: 'desc'
           }
        }) 
  
        return {
            recharges,
            nextOne: !!recharges.slice(take)[0]
        }
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error"}
    }

}