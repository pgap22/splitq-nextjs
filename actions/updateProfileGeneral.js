"use server"
import prisma from "@/db/prisma";
import { authUser } from "@/lib/authUser";
import { generarCodigoVerificacion } from "@/lib/code";
import { sendVerificationChangeEmailApi } from "@/lib/emailAPI";
import { revalidatePath } from "next/cache";

export async function updateProfileGeneral(data) {
    try {
        const user = await authUser();


        if (data?.email) {

            const sameEmailUser = await prisma.users.findFirst({
                where: {
                    email: data.email
                }
            })

            if (sameEmailUser) return { error: "Usuario con el mismo email" }

            const updatableEmail = data.email
            delete data.email;

            const emailToken = generarCodigoVerificacion();

            sendVerificationChangeEmailApi(user.id);

            data.updatableEmail = updatableEmail;
            data.emailToken = emailToken
            const updated = await prisma.users.update({
                where: {
                    id: user.id
                },
                data
            })
            console.log(updated)
            revalidatePath("/")
            return {user: updated, email: true};
        }



        const updatedUser = await prisma.users.update({
            where: {
                id: user.id
            },
            data
        })

        revalidatePath("/")
        return {user: updatedUser}
    } catch (error) {
        console.log(error)
        return { error: "Hubo un error en el servidor"}
    }
}
