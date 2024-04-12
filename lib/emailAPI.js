import { emailChangeHtml } from "./emailTemplate/emailChangeHtml"
import { verificationHtml } from "./emailTemplate/verificationHtml"

export async function sendVerificationEmailApi(emailUser, code) {
    try {
        const data = {
            to: emailUser, // list of receivers
            subject: "Verifica tu cuenta ✔", // Subject line
            html: verificationHtml(`${process.env.DOMAIN}/verify/${code}`)
        }

        await fetch(process.env.EMAIL_API+"/api/email", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })

    } catch (error) {
        console.log(error)
        return { error: "No se ha podido enviar el correo" }
    }
}

export async function sendVerificationChangeEmailApi(emailUser, code) {
    try {
        const data = {
            to: emailUser, // list of receivers
            subject: "Cambio de correo 📧", // Subject line
            html: emailChangeHtml(`${process.env.DOMAIN}/change_email/${code}`)
        }
        await fetch(process.env.EMAIL_API+"/api/email", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
    } catch (error) {
        console.log(error)
        return {error: "No se ha podido enviar el correo"}
    }
}
