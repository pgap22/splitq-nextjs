import prisma from "@/db/prisma"

export async function getSplitPayDevices() {
    try {
        const splitpaydevices = await prisma.splitPay.findMany();
        return splitpaydevices
    } catch (error) {
        console.log(error)
        return []
    }
}