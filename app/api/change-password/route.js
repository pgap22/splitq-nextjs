import { transport } from "@/lib/email";
import { passwordChangeHtml } from "@/lib/emailTemplate/passwordChangeHtml";
import { getUserByEmail } from "@/lib/user";
import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({message: "OK"})
}

export async function POST(req,res){
    try {
        const data = await req.json();
    
        if(!data.email) return NextResponse.json({message: "Provide an Email!"}, {status: 400})
    
        const user = await getUserByEmail(data.email);
            
        if(!user.id && !user.passToken) return NextResponse.json({error: "Esta cuenta no ha solicitado cambio de contraseña"},{status: 400} )
    
       await transport.sendMail({
            from: `SplitQ 👋 <${process.env.GMAIL_EMAIL}>`,
            to: user.updatableEmail, // list of receivers
            subject: "Cambio de contrseña 🛅", // Subject line
            html: passwordChangeHtml(`${process.env.DOMAIN}/auth/change-password/${user.passToken}`)
        })
    
        return NextResponse.json({message: "OK"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "hubo un error en el servidor"}, {status: 500})
    }
}
