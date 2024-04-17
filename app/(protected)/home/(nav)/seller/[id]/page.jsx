import { getProductsBySellerId } from "@/actions/getProductsBySeller"
import { Logo } from "@/components/Logo";
import SettingButtonUser from "@/components/buttons/SettingButtonUser";
import ThemeToggle from "@/components/buttons/theme-toggle";
import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { MdOutlineArrowBack, MdOutlineLocalOffer, MdOutlineStore } from "react-icons/md";



export default async function SellerPesh({ params }) {
    const product = await getProductsBySellerId(params.id);
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
                    product.map(item => <ProductCard product={item} />)
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

                    {product.images.length ? <img className="object-cover aspect-square rounded" src={product.images[0].url} />
                        : <div className="flex aspect-square items-center justify-center">
                            <MdOutlineLocalOffer size={50} />
                        </div>}
                    <div className="max-w-full p-2">
                        <p className="font-bold">{product.name}</p>
                        <p className="truncate max-w-[20ch]">{product.description}</p>
                        <p className="font-bold text-gradient-principal text-gradient bg-gradient-principal">${product.price}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
