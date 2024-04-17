"use server"

import prismaDev from "@/db/prismaDev";
import { generarCodigoVerificacion } from "@/lib/code";
import { sendVerificationChangePasswordApi } from "@/lib/emailAPI";
import { getUserByEmail } from "@/lib/user"

export async function sendPasswordRequest(email){
    try {
        const user = await getUserByEmail(email);
        
        if(!user) return {error: "No se ha encontrado un usuario con ese email"}

        const code = generarCodigoVerificacion();

        await prismaDev.users.update({
            where: {
                id: user.id
            },
            data: {
                passToken: code
            }
        })

        await sendVerificationChangePasswordApi(email)

        return true
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error en el serviodor"}
    }
}  