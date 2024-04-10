import { getProductById } from "@/actions/getProductById";
import { redirect  } from "next/navigation"

export default async function ProductPage({params}){
    const product = await getProductById(params.id);

    if(!product) redirect("/seller/manageProducts")

    return <>
    Desde Producto
    </>
}