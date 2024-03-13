import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md";

export default function CartPage() {
    return (
        <main className="p-4">
            <div className="flex gap-4 items-center">
                <div className="w-10 rounded-md border aspect-square bg-foreground border-border flex items-center justify-center">
                    <Link href={"/home"}>
                        <MdOutlineArrowBack size={24} />
                    </Link>
                </div>
                <h1 className="font-bold text-2xl">Mi Carrito</h1>
            </div>
        </main>
    )
}