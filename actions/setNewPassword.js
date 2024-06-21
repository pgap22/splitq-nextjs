"use server"
import bcryptjs from "bcryptjs"
import prisma from "@/db/prisma";
import { generarCodigoVerificacion } from "@/lib/code";
export async function setNewPassword(newPassword, id){
    try {
        const password = await bcryptjs.hash(newPassword, 5)

        let passToken = ''

        if(process.env.DEPLOYMENT == "local"){
            passToken = generarCodigoVerificacion(8)
        }

        await prisma.users.update({
            where: {
                id
            },
            data: {
                password,
                passToken
            }
        })
        
        return {passToken};

    } catch (error) {
        console.log(error)
        return {error: "Hubo un error en el servidor"}
    }
}
