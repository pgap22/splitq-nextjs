import nodeemailer from "nodemailer"

export const email = nodeemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "jabbits.oficial@gmail.com",
        pass: "zdoclupimbmdldjl"
    }
})

export async function sendVerificationEmail(emailUser, code) {
    await email.sendMail({
        from: `"SplitQ ✌️" <${process.env.EMAIL}>`, // sender address
        to: emailUser, // list of receivers
        subject: "Verifica tu cuenta ✔", // Subject line
        html: `<b>${code}</b>`, // html body
    });
}