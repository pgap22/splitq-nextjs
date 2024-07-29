import { getProductsBySellerId } from "@/actions/getProductsBySeller"
import ProductCard from "@/components/ProductCard";
import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { MdOutlineArrowBack} from "react-icons/md";



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
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    products.map(item => <ProductCard key={item.id} product={item} />)
                }
            </div>
        </>
    )
}

