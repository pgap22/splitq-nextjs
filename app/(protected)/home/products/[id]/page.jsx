
import { getProductById } from "@/actions/getProductById";
import ProductView from "./components/ProductImage";
import ProductBuy from "./components/ProductBuy";
import ProductBack from "./components/ProductBack";
import { getItemById } from "@/actions/getItemById";
import { MdOutlineLocalPizza } from "react-icons/md";
import IconBox from "@/components/ui/IconBox";


export default async function ProductPage({ params }) {
    const product = await getItemById(params.id);
    console.log(product)
    return (
        <>
            <div className="flex justify-between items-center absolute z-10 p-4">
                <div className="flex gap-2 items-center">
                    <ProductBack />
                </div>
            </div>
            <div>
                <ProductView product={product} />
            </div>
            <div className="p-4">
                <h1 className="font-bold text-3xl">{product.name}</h1>
                <p className="text-text-secundary text-lg mt-2 font-bold">{product.seller.name}</p>
                <div className="border border-border bg-gray-background rounded-md my-1 w-fit text-text-secundary text-xs p-2">
                    <span className="font-bold">Stock: {product.stock}</span>
                </div>
                <p className="text-text-secundary mt-4">{product.description}</p>
            </div>
            {
                product.products && (
                    <div className="p-4">
                        <p>Que incluye: </p>
                        {
                            product.products.map((item) => (
                                <ProductItemCombo key={product.id} product={item.product} quantity={item.quantity} />
                            ))
                        }
                    </div>
                )
            }
            <div className="mt-28">
                <ProductBuy product={product} />
            </div>
        </>
    )
}

const ProductItemCombo = ({ product, quantity = 0 }) => {
    return (
        <div className="p-4">
            <div className="grid grid-cols-[max-content_1fr] gap-2">
                <IconBox Icon={MdOutlineLocalPizza} />
                <div>
                    <p>{product.name}</p>
                    <p>Cantidad: {quantity}</p>
                </div>
            </div>
        </div>
    )
}