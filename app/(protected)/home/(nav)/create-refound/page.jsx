import { getBalance } from "@/actions/getBalance";
import FormCreateRefoundBalance from "@/components/form/FormCreateRefoundBalance";
import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md";

export default async function CreateRefound() {
    const {balance, id} = await getBalance();
    return (
        <>
            <Link href={"/home"}>
                <IconBox variant={"square"} Icon={MdOutlineArrowBack} />
            </Link>

            <h1 className="font-bold text-2xl mt-4">Solicitud de rembolso de saldo</h1>
            
            <FormCreateRefoundBalance balance={balance} id={id} />
        </>
    )
}