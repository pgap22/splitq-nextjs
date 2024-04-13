import prisma from "@/db/prisma";
import { transport } from "@/lib/email";
import { verificationHtml } from "@/lib/emailTemplate/verificationHtml";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    return NextResponse.json({ message: "OK" })
}
export async function POST(req, res) {
    try {
        const data = await req.json();

        if (!data.id) return NextResponse.json({ message: "Provide an ID!" }, { status: 400 })

        const user = await prisma.users.findFirst({
            where: {
                id: data.id
            }
        })

        console.log(user)

        if (!user.id && !user.token) return NextResponse.json({ error: "No se ha encontrado esta cuenta no verificada" }, { status: 400 })

        await transport.sendMail({
            from: `SplitQ 👋 <${process.env.OUTLOOK_EMAIL}>`,
            to: user.email, // list of receivers
            subject: "Verifica tu cuenta ✔", // Subject line
            html: verificationHtml(`${process.env.DOMAIN}/verify/${user.token}`)
        })

        return NextResponse.json({ message: "OK" })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "hubo un error en el servidor" }, { status: 500 })
    }

}