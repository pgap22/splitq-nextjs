import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { MdOutlineArrowBack, MdOutlineLocalOffer } from "react-icons/md";
import { getProductById } from "@/actions/getProductById";
import ProductView from "./ProductImage";


export default async function ProductPage({ params }) {
    const product = await getProductById(params.id);
    return (
        <>
            <div className="flex justify-between items-center fixed z-10 p-4">
                <div className="flex gap-2 items-center">
                    <Link href={"/home/seller/"+product.seller.id}>
                        <IconBox variant={"square"} Icon={MdOutlineArrowBack} />
                    </Link>
                </div>
            </div>
            <div>
                <ProductView product={product}/>
            </div>
        </>
    )
}