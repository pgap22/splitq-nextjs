import { authUser } from "@/lib/authUser";
import QRCode from "react-qr-code";

export default async function QrPage() {
    const user = await authUser();
    return (
        <>
            <section className="flex flex-col gap-4 text-center items-center">
                <div className="border-white mb-1 border-8">
                    <QRCode className="max-w-full h-fit" size={500} value={user.id} />
                </div>
                <div className="space-y-2">
                    <h1 className="font-bold text-2xl">Tu Tarjeta Virtual</h1>
                    <p className="text-text-secundary">Este QR te servira para poder recargar saldo en cualquier punto centrico</p>
                </div>
            </section>
        </>
    )
}