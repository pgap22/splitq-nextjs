"use server"
export default async function finalizeSplitPayDeposit(splitpayjwt){
    try {
        const res = await fetch(process.env.API_SPLITPAY+"/finalize_deposit", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                splitpayjwt
            })
        })
        const data = await res.json();

        if(data.status == "FAILED"){
           return {...data, error: true}
        }
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
        return {
            error: "SERVIDOR"
        }
    }
}