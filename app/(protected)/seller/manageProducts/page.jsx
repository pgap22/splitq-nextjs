import { getProducts } from "@/actions/getProducts";
import SellerProducts from "@/containers/SellerProducts";
export default async function ManageProduct() {
    const productos = await getProducts();
    return (
        <main>
            <SellerProducts initalProducts={productos}/>
        </main>
    )
}