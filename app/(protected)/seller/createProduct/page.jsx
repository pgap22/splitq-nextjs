import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

export default async function AddProduct() {
    return (
        <>
            <div>
                <Link href={"../seller"}>
                    <IconBox
                        Icon={MdArrowBack}
                    />
                </Link>
                
                <h1>Añadir producto</h1>
            </div>
        </>
    )
}