import { getRefoundBalanceByUserId } from "@/actions/getRefoundBalanceByUserId";
import IconBox from "@/components/ui/IconBox";
import MyRefoundsList from "@/containers/MyRefoundsList";
import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md";

export default async function UserRefounds({ params }) {
	const refounds = await getRefoundBalanceByUserId(params.id);
	return (
		<>
			<main className="p-4">
				<Link href={"/mod/user/"+params.id}>
					<IconBox variant="square" Icon={MdOutlineArrowBack} />
				</Link>
				<h1 className="mt-4 font-bold text-2xl">Rembolsos de saldo</h1>
			</main>
			<MyRefoundsList refounds={refounds} redirect={"/mod/user/"+params.id+"/refounds/"} />
		</>
	)
}