import { getCategories } from "@/actions/categories";
import { getProductById } from "@/actions/getProductById";
import FormEditProduct from "@/components/form/FormEditProduct";
import IconBox from "@/components/ui/IconBox";
import { redirect } from "next/navigation"
import { MdOutlineArrowBack } from "react-icons/md";

export default async function ProductPage({ params }) {
    const product = await getProductById(params.id);
    const categories = await getCategories();
    if (!product) redirect("/seller/manageProducts")

    return (
        <main className="p-4">
            <IconBox Icon={MdOutlineArrowBack} variant="square" />
            <h1 className="font-bold text-2xl mt-4">Editar Producto</h1>
            <FormEditProduct product={product} categories={categories}/>
        </main>
    )
}