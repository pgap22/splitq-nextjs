import { statusImgServer, statusSocketIO } from "@/lib/status"
import clsx from "clsx"

export default async function Status() {
    const imgStatus = await statusImgServer();
    const socketStatus = await statusSocketIO();
    console.log(socketStatus)
    return (
        <main className="p-2 md:min-h-screen flex justify-center items-center">
            <div className="border w-full md:max-w-md space-y-4 select-none border-border bg-foreground p-4 rounded">
                <h1 className="text-xl md:text-2xl font-bold">Status de <span className="text-gradient bg-gradient-principal">SplitQ</span></h1>
                <div className="flex gap-2 items-center">
                    <StatusSymbol response={imgStatus} />
                    <p>Servidor de imagenes</p>
                </div>
                <div className="flex gap-2 items-center">
                    <StatusSymbol response={socketStatus} />
                    <p>Servidor de socketio</p>
                </div>
            </div>
        </main>
    )
}

const StatusSymbol = ({ response }) => {
    const signal = response.data.ok
    return (
        <div className={clsx("w-6 aspect-square rounded-full", signal ? 'bg-green-500' : 'bg-red-500')}></div>
    )
}