import { auth } from "@/auth"
import BackButton from "@/components/buttons/BackButton";
import { Button } from "@/components/ui/button";
import prisma from "@/db/prisma"
import dayjs from "dayjs";
import Link from "next/link";

export default async function OrdersPage() {

    const session = await auth();
    const orders = await prisma.orders.findMany({
        where: {
            id_user: session.user.id
        },
        orderBy:{
            createdAt: 'desc'
        }
    })

    console.log(orders)

    return (
        <>
            <BackButton href={"/home"} />
            <h1 className="font-bold text-2xl mt-2">Historial de Ordenes</h1>
            <div className="mt-4 flex flex-col gap-4">
                {
                    orders.map(order => <Order key={order.id} order={order} />)
                }
            </div>
        </>
    )
}

const Order = ({ order }) => {
    return (
        <Link href={"/home/orders/" + order.id}>
            <div className="border border-border rounded bg-foreground p-4">
                <p className="font-bold mb-2">Orden de Compra</p>
                <div className="flex items-center justify-between">
                    <p>{dayjs(order.createdAt).format("YYYY/MM/DD HH:mm A")}</p>
                    {/* <h2>Orden - {order.id}</h2> */}
                    <p className="font-bold text-lg">${order.totalPrice}</p>
                </div>
                <Button className="w-full mt-2">Ver mas informacion</Button>
            </div>
        </Link>
    )
}