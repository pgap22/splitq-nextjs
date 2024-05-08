import { getHistoryByUserId } from "@/actions/getHistoryByUserId";
import BackButton from "@/components/buttons/BackButton";

export default async function HistoryPage() {
    const history = await getHistoryByUserId();
    return(
        <>
         <main className="p-4">
            <BackButton href={"/home"} />
            <h1 className="font-bold mt-4 text-2xl">Historial de Acciones</h1>
         </main>
        </>
    )
}