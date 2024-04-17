import { getComboById } from "@/actions/getComboById";
import { getProductsSeller } from "@/actions/getProductsSeller";
import FormEditCombo from "@/components/form/FormEditCombo";
import IconBox from "@/components/ui/IconBox";
import { redirect } from "next/navigation"
import { MdArrowBack } from "react-icons/md";
import Link from "next/link"
export default async function ComboPage({ params }) {
    const combo = await getComboById(params.id);
    const products = await getProductsSeller();
    if (!combo) redirect("/seller/manageProducts")

    return (
        <>
            <div className="flex justify-between p-4">
                <Link href={"/seller/manageProducts?q=combos"}>
                    <IconBox
                        Icon={MdArrowBack}
                    />
                </Link>
            </div>
            <FormEditCombo productos={products} combo={combo} />
        </>
    )
}