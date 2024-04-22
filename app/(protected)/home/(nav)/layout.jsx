import SearchHome from "@/containers/SearchHome";
import GradientIcon from "@/components/ui/GradientIcon";
import Link from "next/link";
import { MdOutlineConfirmationNumber, MdOutlineHome, MdOutlineQrCode,  MdOutlineShoppingCart } from "react-icons/md";


export default async function NavLayout({ children }) {

    return (
        <div className="sm:grid sm:grid-cols-[max-content_minmax(0,1fr)] sm:h-[100dvh]">
            <main className="p-4 mb-24 sm:order-2">
                {children}
            </main>
            <div className="fixed sm:static sm:w-fit sm:p-4 sm:gap-4 sm:border-r sm:border-border sm:flex sm:flex-col  bg-foreground bottom-0 justify-items-center nav w-full grid grid-cols-4 py-4">
                <Link className="hidden sm:block" href={"/home"}>
                    <MdOutlineHome size={26} />
                </Link>

                <Link href={"/home/qr-card"}>
                    <MdOutlineQrCode size={26} />
                </Link>
                <SearchHome />
                <Link href={"/home/tickets"}>
                    <MdOutlineConfirmationNumber size={26} />

                </Link>
                <Link href={"/home/cart"}>
                    <MdOutlineShoppingCart size={26} />
                </Link>
                <Link href={"/home"} className="absolute border-gradient border-2 w-14 aspect-square flex justify-center items-center rounded-full bg-gradient-principal -top-1/2">
                    <GradientIcon>
                        <MdOutlineHome className="icon-gradient" size={28} />
                    </GradientIcon>
                </Link>
            </div>
        </div>
    )
}