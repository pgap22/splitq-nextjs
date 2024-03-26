import { authUser } from "@/lib/authUser";
import prisma from "@/lib/db";
// import prismaDev from "@/lib/dbDev";

export default async function getRecharges() {

    try {
        const modUser = await authUser();
        const recharges = await prisma.recharges.findMany({
           where: {
               modID: modUser.id
           },
           select: {
                id: true,
                user: {
                    select: {
                        name: true,
                        lastname: true
                    }
                },
                balance: true
           }
        }) 
       
        return recharges
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error"}
    }

}