import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import FormAddProduct from "@/components/form/FormAddProduct";
import { getCategories } from "@/actions/categories";

export default async function AddProduct() {
    const categories = await getCategories()
    return (
        <>
            <div className="flex justify-between p-4">
                <Link href={"/seller"}>
                    <IconBox
                        Icon={MdArrowBack}
                    />
                </Link>
            </div>
            <FormAddProduct  categories={categories}/>
        </>
    )
}