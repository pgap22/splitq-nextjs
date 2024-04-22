import { getUserCart } from "@/actions/getUserCart";
import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { MdOutlineArrowBack, MdOutlineLocalOffer } from "react-icons/md";

export default async function CartPage() {
    const products = await getUserCart();
    console.log(products)
    return (
        <>
            <main className="p-4">
                <div className="flex gap-4 items-center">
                    <Link href={"/home"}>
                        <IconBox variant={"square"} Icon={MdOutlineArrowBack} />
                    </Link>
                </div>
                <h1 className="mb-5 font-bold text-3xl">Carrito de compras</h1>
            </main>
            <div className="flex flex-col gap-4">
                {
                    products.map(product => <CartProductCard item={product} />)
                }
            </div>
        </>
    )
}

const CartProductCard = ({ item }) => {
    const product = item.product

    return (
        <>
            <div className="border-b flex p-2 gap-2 border-border w-full">
                {product.images.length ? <img className="max-h-16 aspect-square object-cover rounded border border-border" src={product.images[0].url} />
                    : <div className="w-full h-64 border-b border-border flex items-center justify-center">
                        <MdOutlineLocalOffer size={50} />
                    </div>}

                <div className="flex flex-col">
                    <h1 className="font-bold text-lg">{product.name}</h1>
                    <p className="text-xs text-text-secundary">{product.seller.name}</p>
                    <h1 className="font-bold text-lg text-gradient bg-gradient-principal">${product.price}</h1>
                </div>
            </div>
        </>
    )
}