import { getUserCart } from "@/actions/getUserCart";
import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { MdOutlineArrowBack, MdOutlineLocalOffer } from "react-icons/md";

export default async function CartPage() {
    const product = await getUserCart();
    console.log(product)
    return (
        <main className="p-4">
            <div className="flex gap-4 items-center">
                <Link href={"/home"}>
                    <IconBox variant={"square"} Icon={MdOutlineArrowBack} />
                </Link>
            </div>
            <h1 className="mb-5 font-bold text-3xl">Carrito de compras</h1>
            {/* <CartProductCard /> */}
        </main>
    )
}

const CartProductCard = ({ product }) => {
    return (
        <>
            <div className="border-b border-border w-full">
                {product.images.length ? <img className="w-full max-h-64 object-cover rounded border border-border" src={product.images[selectedImages].url} />
                    : <div className="w-full h-64 border-b border-border flex items-center justify-center">
                        <MdOutlineLocalOffer size={50} />
                    </div>}
            </div>
        </>
    )
}