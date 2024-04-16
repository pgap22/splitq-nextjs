import getAllMyItemsSeller from "@/actions/getAllMyItemsSeller";
import SellerProducts from "@/containers/SellerProducts";
export default async function ManageProduct() {
    const items = await getAllMyItemsSeller();
    return (
        <main>
            <SellerProducts items={items}/>
        </main>
    )
}