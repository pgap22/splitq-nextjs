import QrScannerButton from "@/components/qrScanner";
import { Button } from "@/components/ui/button";
import { authUser } from "@/lib/authUser";
import QRCode from "react-qr-code";

export default async function QrPage(){
    const user = await authUser();
    return(
        <>
        <section className="flex flex-col items-center">
            <div className="border-white mb-4 border-8">
                <QRCode value={user.id}/>
            </div>
                <QrScannerButton />
        </section>
        </>
    )
}