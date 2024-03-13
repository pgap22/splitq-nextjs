import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md";

export default function CartPage() {
    return (
        <main className="p-4">
            <div className="flex gap-4 items-center">
                    <Link href={"/home"}>
                        <IconBox variant={"square"} Icon={MdOutlineArrowBack} />
                    </Link>
                <h1 className="font-bold text-2xl">Mi Carrito</h1>
            </div>
        </main>
    )
}