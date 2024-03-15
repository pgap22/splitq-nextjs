import SearchHome from "@/components/home/SearchHome";
import GradientIcon from "@/components/ui/GradientIcon";
import Link from "next/link";
import { MdOutlineConfirmationNumber, MdOutlineCreditCard, MdOutlineHome, MdOutlineSearch, MdOutlineShoppingCart } from "react-icons/md";


export default async function NavLayout({ children }) {

    return (
        <>
            {children}
            <div className="fixed bottom-0 justify-items-center nav w-full grid grid-cols-4 py-4">
                <Link href={"/home/qr-card"}>
                    <MdOutlineCreditCard size={26} />
                </Link>
                <SearchHome />
                <Link href={"/home/tickets"}>
                    <MdOutlineConfirmationNumber size={26} />

                </Link>
                <Link href={"/home/cart"}>
                    <MdOutlineShoppingCart size={26} />
                </Link>
                <div className="absolute border-gradient border-2 w-14 aspect-square flex justify-center items-center rounded-full bg-gradient-principal -top-1/2">
                    <GradientIcon>
                        <MdOutlineHome className="icon-gradient" size={28} />
                    </GradientIcon>
                </div>
            </div>
        </>
    )
}