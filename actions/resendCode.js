"use server"

import { sendVerificationEmailApi } from "@/lib/emailAPI"
import { getUserById } from "@/lib/user"

export async function resendEmailBVerification(id){ 
    try {
        const user = await getUserById(id)

        if(!user.token) return {error: "este usuario ya esta verificado"}
        
        sendVerificationEmailApi(user.id)
        
    } catch (error) {
        console.log(error)
        return {error: "No se ha podido enviar el correo"}
    }
}
