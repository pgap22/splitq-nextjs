import prisma from "@/db/prisma";
import { transport } from "@/lib/email";
import { emailChangeHtml } from "@/lib/emailTemplate/emailChangeHtml";
import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({message: "OK"})
}

export async function POST(req,res){
    try {
        const data = await req.json();
    
        if(!data.id) return NextResponse.json({message: "Provide an ID!"}, {status: 400})
    
        const user = await prisma.users.findFirst({
            where: {
                id: data.id
            }
        })
            
        if(!user.id && !user.emailToken) return NextResponse.json({error: "No se ha encontrado esta cuenta no verificada"},{status: 400} )
    
       await transport.sendMail({
            from: `SplitQ 👋 <${process.env.OUTLOOK_EMAIL}>`,
            to: user.updatableEmail, // list of receivers
            subject: "Cambio de Email 📧", // Subject line
            html: emailChangeHtml(`${process.env.DOMAIN}/change-email/${user.emailToken}`)
        })
    
        return NextResponse.json({message: "OK"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "hubo un error en el servidor"}, {status: 500})
    }
}