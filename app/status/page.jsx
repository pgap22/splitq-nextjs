import { statusApi } from "@/actions/statusApi";
import { Button } from "@/components/ui/button";
import clsx from "clsx"
import Link from "next/link";
export const dynamic = 'force-dynamic'
export default async function Status() {
    const data = await statusApi();
    return (
        <main className="p-2 md:min-h-screen flex justify-center items-center">
            <div className="border w-full md:max-w-md space-y-4 select-none border-border bg-foreground p-4 rounded">
                <h1 className="text-xl md:text-2xl font-bold">Status de <span className="text-gradient bg-gradient-principal">SplitQ</span></h1>
                <div className="flex gap-2 items-center">
                    <StatusSymbol response={data.status.db} />
                    <p>Base de datos</p>
                </div>
                <div className="flex gap-2 items-center">
                    <StatusSymbol response={data.status.imagenes} />
                    <p>Servidor de imagenes</p>
                </div>
                <div className="flex gap-2 items-center">
                    <StatusSymbol response={data.status.socketio} />
                    <p>Servidor de socketio</p>
                </div>
                <Button asChild className="w-full">
                    <Link href={"/"}>
                        Volver
                    </Link>
                </Button>
            </div>
        </main>
    )
}

const StatusSymbol = ({ response }) => {
    const signal = response
    return (
        <div className={clsx("w-6 aspect-square rounded-full", signal ? 'bg-green-500' : 'bg-red-500')}></div>
    )
}