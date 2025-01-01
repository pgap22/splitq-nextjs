import nodemailer from "nodemailer"
import { emailChangeHtml } from "./emailTemplate/emailChangeHtml";

const emailData = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    logger: true,
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASS
    }
}

if(process.env.EMAIL_TEST=="mailtrap"){
    emailData.host = "sandbox.smtp.mailtrap.io"
    emailData.secure = false;
}

export const transport = nodemailer.createTransport(emailData);

export async function sendVerificationEmail(emailUser, code) {
    try {
       
      
    } catch (error) {
        console.log(error)
        return { error: "No se ha podido enviar el correo" }
    }
}

export async function sendVerificationChangeEmail(emailUser, code) {
    try {
        await transport.sendMail({
            from: `SplitQ 👋 <${process.env.OUTLOOK_EMAIL}>`,
            to: emailUser, // list of receivers
            subject: "Cambio de correo 📧", // Subject line
            html: emailChangeHtml(`${process.env.DOMAIN}/change_email/${code}`)
        })
    } catch (error) {
        console.log(error)
        return {error: "No se ha podido enviar el correo"}
    }
}
