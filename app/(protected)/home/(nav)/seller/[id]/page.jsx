import { getProductsBySellerId } from "@/actions/getProductsBySeller"
import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { MdOutlineArrowBack, MdOutlineLocalOffer, MdOutlineStore } from "react-icons/md";



export default async function SellerPesh({ params }) {
    const items = await getProductsBySellerId(params.id);
    const products = [...items.products, ...items.combos]
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Link href={"/home"}>
                        <IconBox variant={"square"} Icon={MdOutlineArrowBack} />
                    </Link>
                </div>
            </div>
            <div className=" mt-4 grid grid-cols-2 gap-4">
                {
                    products.map(item => <ProductCard key={item.id} product={item} />)
                }
            </div>
        </>
    )
}
const ProductCard = ({ product }) => {
    return (
        <Link href={"/home/products/"+product.id}>
            <div className="border border-border rounded bg-foreground">
                <div className="flex flex-col">

                    {(product?.images && product?.images.length) ? <img className="object-cover aspect-square rounded" src={product.images[0].url} />
                        : <div className="flex aspect-square border-b border-border items-center justify-center">
                            <MdOutlineLocalOffer size={50} />
                        </div>}
                    <div className="max-w-full p-2">
                        <p className="font-bold">{product.name}</p>
                        {/* <p className="truncate max-w-[20ch]">{product.description}</p> */}
                        <p className="font-black text-2xl text-gradient-principal text-gradient bg-gradient-principal">${product.price}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
