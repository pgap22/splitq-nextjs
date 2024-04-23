import { getUserCart } from "@/actions/getUserCart";
import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { MdAdd, MdOutlineArrowBack, MdOutlineLocalOffer, MdRemove } from "react-icons/md";
import CartProductCard from "./components/CartProductCard";
import CartProductButton from "./components/CartProductButton";

export default async function CartPage() {
    const products = await getUserCart();

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
            <div className="absolute bottom-0 left-0 right-0 w-full p-4">
                <CartProductButton />
            </div>
        </>
    )
}