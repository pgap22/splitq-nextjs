import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import FormAddCombo from "@/components/form/FormAddCombo";
import { getProductsSeller } from "@/actions/getProductsSeller";

export default async function AddCombo() {

    const productos = await getProductsSeller();
    

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