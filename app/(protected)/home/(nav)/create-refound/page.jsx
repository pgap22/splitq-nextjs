import { getBalance } from "@/actions/getBalance";
import FormCreateRefoundBalance from "@/components/form/FormCreateRefoundBalance";
import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md";

export default async function CreateRefound() {
    const balance = await getBalance();
    return (
        <>
            <Link href={"/home"}>
                <IconBox variant={"square"} Icon={MdOutlineArrowBack} />
            </Link>

            <h1 className="font-bold text-2xl mt-4">Solicitud de rembolso de saldo</h1>
            <div className="text-xs my-2 border border-border w-fit p-2 rounded bg-foreground text-text-secundary">
                Saldo Actual: <span className="text-gradient bg-gradient-principal font-bold">${balance}</span>
            </div>
            <FormCreateRefoundBalance balance={balance} />
        </>
    )
}