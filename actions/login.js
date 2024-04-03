"use server"

import { signIn } from "@/auth"
import { LOGIN_REDIRECT } from "@/auth.routes";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default async function login(data) {
    try {
        await signIn("credentials", {
            ...data,
            redirect: false
        });
    } catch (error) {
        if(error instanceof AuthError){
            if(error.type == "CredentialsSignin"){
                return { error: "Usuario o contraseñas son invalidas" }
            }

            if(error.message.startsWith("Bad Verification")){
                return {error: "Debes verificar tu cuenta"}
            }
        }

        return {error: "Hubo error en el servidor"}
    }

    return redirect(LOGIN_REDIRECT)
}