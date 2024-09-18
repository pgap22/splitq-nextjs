"use server"
export async function checkAuthSplitPay(splitpayjwt) {
    try {
        const res = await fetch(process.env.API_SPLITPAY+"/check_authtoken", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                splitpayjwt
            })
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)
        return {error: "Hubo un error en el servidor"}
    }
}