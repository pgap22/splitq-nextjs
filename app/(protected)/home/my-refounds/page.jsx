import { getUserRefounds } from "@/actions/getUserRefounds";
import IconBox from "@/components/ui/IconBox";
import MyRefoundsList from "@/containers/MyRefoundsList";
import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md";

export default async function MyRefoundsPage() {
    const refounds = await getUserRefounds();
    return (
        <>
        <div className="p-4">
            <Link href={"/home"}>
            <IconBox variant="square" Icon={MdOutlineArrowBack} />
            </Link>
            <h1 className="mt-4 font-bold text-2xl">Mis Rembolsos</h1>
        </div>
        <MyRefoundsList refounds={refounds}/>
        </>
    );
}
