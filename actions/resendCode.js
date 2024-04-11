"use server"

import { sendVerificationEmail } from "@/lib/email"
import { getUserById } from "@/lib/user"

export async function resendEmailBVerification(id){ 
    try {
        const user = await getUserById(id)
    
        sendVerificationEmail(user.email, user.token)
    } catch (error) {
        console.log(error)
        return {error: "No se ha podido enviar el correo"}
    }
}