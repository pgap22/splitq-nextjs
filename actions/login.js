"use server"

import { signIn } from "@/auth"

export default async function login(data) {
    try {
        await signIn("credentials", {
            ...data,
            redirect: false
        });
        return true
    } catch (error) {
        return { error: "Usuario o contraseñas son invalidas" }
    }
}