
export async function sendVerificationEmailApi(id) {
    try {
     
        await fetch(process.env.DOMAIN+"/api/verify-email", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({id})
        })

    } catch (error) {
        console.log(error)
        return { error: "No se ha podido enviar el correo" }
    }
}

export async function sendVerificationChangeEmailApi(id) {
    try {
        await fetch(process.env.DOMAIN+"/api/change-email", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({id})
        })
    } catch (error) {
        console.log(error)
        return {error: "No se ha podido enviar el correo"}
    }
}
