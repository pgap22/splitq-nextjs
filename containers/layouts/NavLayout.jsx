import SearchHome from "@/containers/SearchHome";
import GradientIcon from "@/components/ui/GradientIcon";
import Link from "next/link";
import {
  MdOutlineConfirmationNumber,
  MdOutlineHome,
  MdOutlineQrCode,
  MdOutlineSearch,
  MdOutlineShoppingCart,
} from "react-icons/md";

export default async function UserLayout({ children }) {
  return (
    <div className="sm:grid sm:grid-cols-[max-content_minmax(0,1fr)] sm:h-[100dvh]">
      <main className="p-4 mb-16  sm:order-2">{children}</main>
      <div className="fixed items-center sm:static sm:w-fit sm:p-4 sm:gap-4 sm:border-r sm:border-border sm:flex sm:flex-col  bg-foreground bottom-0 justify-items-center nav w-full grid grid-cols-5 py-1">
        <Link className="hidden sm:block" href={"/home"}>
          <MdOutlineHome size={26} />
        </Link>

        <Link href={"/home/qr-card"}>
          <MdOutlineQrCode size={26} />
        </Link>
        <Link href={"/home/search"}>
          <MdOutlineSearch size={26} />
        </Link>
        <Link
          href={"/home"}
          className="sm:hidden border-gradient border-2 p-2 flex justify-center items-center rounded-full bg-gradient-principal"
        >
          <GradientIcon>
            <MdOutlineHome className="icon-gradient" size={26} />
          </GradientIcon>
        </Link>
        <Link href={"/home/tickets"}>
          <MdOutlineConfirmationNumber size={26} />
        </Link>
        <Link href={"/home/cart"}>
          <MdOutlineShoppingCart size={26} />
        </Link>
      </div>
    </div>
  );
}
