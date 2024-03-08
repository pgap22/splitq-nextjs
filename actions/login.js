"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default async function login(data) {
    try {
        await signIn("credentials", {
            ...data,
            redirect: false
        });
    } catch (error) {
        console.log(error)
        if(error instanceof AuthError){
            if(error.type == "CredentialsSignin"){
                return { error: "Usuario o contraseñas son invalidas" }
            }
        }

        return {error: "Hubo error en el servidor"}
    }

    return redirect("/home")
}