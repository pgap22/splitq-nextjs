import { getRefoundBalaceByIdAsMod } from "@/actions/getRefoundByIdAsMod";
import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MdOutlineArrowBack } from "react-icons/md";
import RefoundsActions from "./RefoundsActions";

export default async function RefoundPage({ params }) {
  const refound = await getRefoundBalaceByIdAsMod(params.id_refound);

  if (!refound) return redirect("/mod/user/" + params.id+"/refounds");

  return (
    <>
      <div className="p-4">
        <Link href={"/mod/user/" + params.id+"/refounds"}>
          <IconBox variant="square" Icon={MdOutlineArrowBack} />
        </Link>
        <h1 className="mt-4 font-bold text-2xl">Solicitud de balance</h1>
      </div>
      <div className="border-b space-y-4 border-border p-4">
        <div>
          <h2 className="font-bold">Motivo</h2>
          <p className="text-text-secundary">{refound.reason}</p>
        </div>
        <div>
          <h2 className="font-bold">Saldo a rembolsar</h2>
          <p className="text-gradient font-black bg-gradient-principal">
            ${refound.refoundBalance}
          </p>
        </div>
      </div>
      <RefoundsActions />
    </>
  );
}
