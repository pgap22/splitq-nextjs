import { getCategories } from "@/actions/categories";
import { getProductById } from "@/actions/getProductById";
import FormEditProduct from "@/components/form/FormEditProduct";
import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { redirect } from "next/navigation"
import { MdOutlineArrowBack } from "react-icons/md";

export default async function ProductPage({ params }) {
    const product = await getProductById(params.id);
    const categories = await getCategories();
    if (!product) redirect("/seller/manageProducts")

    return (
        <main className="p-4">
            <Link href={"/seller/manageProducts"}>
                <IconBox Icon={MdOutlineArrowBack} variant="square" />
            </Link>
            <h1 className="font-bold text-2xl mt-4">Editar Producto</h1>
            <FormEditProduct product={product} categories={categories} />
        </main>
    )
}