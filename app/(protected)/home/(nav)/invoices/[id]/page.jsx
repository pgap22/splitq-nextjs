import { auth } from "@/auth"
import BackButton from "@/components/buttons/BackButton";
import prisma from "@/db/prisma"
import { multiplyDecimal } from "@/lib/decimal";
import dayjs from "dayjs"
import { redirect } from "next/navigation"

export default async function OrderIDPage({ params }) {
    const session = await auth();
    const invoice = await prisma.invoices.findFirst({
        where: {
            AND: [
                {
                    id: params.id
                },
                {
                    id_user: session.user.id
                }
            ]
        },
        include: {
            invoiceProducts: true
        }
    })

    if (!invoice) return redirect("/home/invoices")

    const user = session.user

    return (
        <>
            <BackButton href={"/home/invoice"} />
            <div className="space-y-2 mt-2">
                <h1 className="font-bold text-2xl">Orden</h1>
                <p className="text-sm text-gray-text">N°{invoice.id}</p>
                <p className="text-sm p-2 border border-border bg-foreground text-gray-text rounded-md w-fit">{dayjs(invoice.createdAt).format("YYYY/MM/DD HH:MM")}</p>
            </div>
            <div className="mt-4">
                <p className="text-gray-text text-sm">Comprador</p>
                <p>{user.name} {user.lastname}</p>
            </div>
            <div className="w-full border-t border-border my-4"></div>
            {invoice.invoiceProducts.map(product => <ProductOrder key={product.id} product={product} />)}
            <div className="w-full border-t border-border my-4"></div>
            <p className="text-right font-bold text-lg">Total: ${order.totalPrice}</p>
        </>
    )
}

const ProductOrder = ({ product }) => {
    return (
        <div className="grid grid-cols-[max-content_1fr_max-content] gap-4  ">
            <p>{product.quantity}</p>
            <p>{product.product_name}</p>
            <p>${product.product_price} {product.quantity >= 2 && <span className="text-gray-text">(${multiplyDecimal(product.quantity, product.product_price)})</span>}</p>
        </div>
    )
}