import nodemailer from "nodemailer"
import { verificationHtml } from "./emailTemplate/verificationHtml";
import { emailChangeHtml } from "./emailTemplate/emailChangeHtml";

const transport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    logger: true,
    auth: {
        user: process.env.OUTLOOK_EMAIL,
        pass: process.env.OUTLOOK_PASS
    }
});

export async function sendVerificationEmail(emailUser, code) {
    try {
       
        await transport.sendMail({
            from: `SplitQ 👋 <${process.env.OUTLOOK_EMAIL}>`,
            to: emailUser, // list of receivers
            subject: "Verifica tu cuenta ✔", // Subject line
            html: verificationHtml(`${process.env.DOMAIN}/verify/${code}`)
        })

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
