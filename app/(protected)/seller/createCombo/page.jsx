import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import FormAddCombo from "@/components/form/FormAddCombo";
import { getProducts } from "@/actions/getProducts";

export default async function AddCombo() {

    const productos = await getProducts();
    
    console.log(productos)

    return (
        <>
            <div className="flex justify-between p-4">
                <Link href={"/seller"}>
                    <IconBox
                        Icon={MdArrowBack}
                    />
                </Link>
            </div>
            <FormAddCombo productos={productos} />
        </>
    )
}