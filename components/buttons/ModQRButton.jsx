"use client"
import QrScannerButton from "./qrScannerButton";
import { useRouter } from "next/navigation";

export default function ModQRButton() {
    const router = useRouter();
    const scanUserId = ({data})=>{
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}-user$/i.test(data)) return;

        const idUser = data.split("-user")[0];
        
        router.push("/mod/user/"+idUser)
    }
    return (
        <QrScannerButton onValue={scanUserId}>
            Escanear QR
        </QrScannerButton>
    )
}