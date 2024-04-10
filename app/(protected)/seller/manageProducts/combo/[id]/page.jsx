import { getComboById } from "@/actions/getComboById";
import { redirect  } from "next/navigation"

export default async function ComboPage({params}){
    const combo = await getComboById(params.id);

    if(!combo) redirect("/seller/manageProducts")

    return <>
    Desde Combo
    </>
}