import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { auth } from "@/auth";
import { items } from "@/lib/models/items";
import { category } from "@/lib/models/category";
import FormAddItem from "@/components/form/seller/item/FormAddItem";
import { redirect } from "next/navigation";
import FormEditItem from "@/components/form/seller/item/FormEditItem";

export default async function page({params}) {
    const { user } = await auth();

    const currentItem = await items.getItemById({
        id_item: params.id
    })

    if(!currentItem) return redirect("/seller/manageItems")

    const productos = await items.getItemsBySeller({ id_seller: user.id, type: 'PRODUCT' })
    const categories = await category.getCategories();
    return (
        <>
            <div className="flex justify-between p-4">
                <Link href={"/seller"}>
                    <IconBox
                        Icon={MdArrowBack}
                    />
                </Link>
            </div>
            <FormEditItem item={currentItem} productos={productos} categories={categories} />
        </>
    )
}