import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { MdOutlineArrowBack, MdOutlineLocalOffer } from "react-icons/md";
import { getProductById } from "@/actions/getProductById";
import ProductView from "./components/ProductImage";
import ProductBuy from "./components/ProductBuy";


export default async function ProductPage({ params }) {
    const product = await getProductById(params.id);
    return (
        <>
            <div className="flex justify-between items-center absolute z-10 p-4">
                <div className="flex gap-2 items-center">
                    <Link href={"/home/seller/" + product.seller.id}>
                        <IconBox variant={"square"} Icon={MdOutlineArrowBack} />
                    </Link>
                </div>
            </div>
            <div>
                <ProductView product={product} />
            </div>
            <div className="p-4">
                <h1 className="font-bold text-3xl">{product.name}</h1>
                <p className="text-text-secundary text-lg mt-2 font-bold">{product.seller.name}</p>
                <p className="text-text-secundary mt-4">{product.description}</p>
            </div>
            <div>
                <ProductBuy product={product}/>
            </div>
        </>
    )
}