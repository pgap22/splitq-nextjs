import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { auth } from "@/auth";
import { items } from "@/lib/models/items";
import { category } from "@/lib/models/category";
import FormAddItem from "@/components/form/seller/item/FormAddItem";

export default async function page() {
    const { user } = await auth();

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
            <FormAddItem productos={productos} categories={categories} />
        </>
    )
}