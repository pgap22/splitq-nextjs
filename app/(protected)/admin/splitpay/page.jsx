import BackButton from "@/components/buttons/BackButton";
import { Button } from "@/components/ui/button";
import AddSplitPayDevice from "./components/AddSplitPayDevice";
import { getSplitPayDevices } from "@/actions/getSplitPayDevices";
import dayjs from "dayjs";
import DeleteSplitPayDevice from "./components/DeleteSplitPayDevice";
import GenerateSplitPayToken from "./components/GenerateSplitPayToken";

export default async function SplitPayPageAdmin() {
    const devices = await getSplitPayDevices()
    return (
        <div className="p-4">
            <BackButton />
            <h2 className="mt-4 text-2xl font-bold">Tus Dispositivos SplitPay</h2>
            <AddSplitPayDevice />
            <div className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {devices.map(device => <SplitPayDevice device={device} />
                )}
            </div>
        </div>
    )
}

const SplitPayDevice = ({ device }) => {
    return (
        <div className="border border-border rounded-md p-4">
            <h3 className="font-bold text-xl">{device.name}</h3>
            <div className="flex items-center gap-2">
                <p className="mt-2">Estado: {
                    device.status == "active"
                    ? <span className="text-green-400">Configurado</span>
                    : <span className="text-gray-400">Sin Configurar</span>
                }</p>
            </div>
            <div className="border text-text-secundary w-fit my-1 border-border text-xs p-1 rounded bg-foreground">
                Creado: {dayjs(device.createdAt).format("YYYY/MM/DD HH:mm A")}
            </div>
            <div className="grid mt-2 gap-2 grid-cols-[1fr_max-content] items-center">
                <GenerateSplitPayToken id={device.id} />
                <DeleteSplitPayDevice id={device.id} />
            </div>
        </div>
    )
}