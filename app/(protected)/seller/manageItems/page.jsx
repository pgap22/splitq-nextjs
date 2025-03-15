import SellerItems from "@/containers/seller/items/SellerItems";
import { authUser } from "@/lib/authUser";
import { items } from "@/lib/models/items";
export default async function ManageProduct() {
    const user = await authUser();
    const data = await items.getItemsBySeller({ id_seller: user.id, type: 'ALL' });
    return (
        <main>
            <SellerItems items={data} />
        </main>
    )
}