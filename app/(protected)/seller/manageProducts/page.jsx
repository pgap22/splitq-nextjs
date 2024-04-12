import { getProductsSeller } from "@/actions/getProductsSeller";
import SellerProducts from "@/containers/SellerProducts";
export default async function ManageProduct() {
    const productos = await getProductsSeller();
    return (
        <main>
            <SellerProducts initalProducts={productos}/>
        </main>
    )
}