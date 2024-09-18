"use server"


//Only for dev propurses while we are getting hardware
export async function _DEV_SplitDeposit(amount,splitpayjwt) {
    try {
        const res = await fetch(process.env.API_SPLITPAY+"/deposit", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                value: amount,
                splitpayjwt,
            })
        });
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
        return {error: true}
    }
}