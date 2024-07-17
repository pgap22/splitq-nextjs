"use server"
export async function statusApi(){
    try {
        const res = await fetch(process.env.DOMAIN+"/api/status")
        const data = await res.json();
        return data;
    } catch (error) {
        return false
    }
}