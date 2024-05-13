"use client"

import { useRouter } from "next/navigation"
import QrScannerButton from "./qrScannerButton"

export default function SellerQRScanner() {
    const router = useRouter();
    const qrScan = ({ data }) => {
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}-user$/i.test(data) && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}-ticket$/i.test(data)) return

        const isUser = data.endsWith("-user");

        if (isUser) {
            const id_user = data.split("-user")[0]
            router.push("/seller/user/" + id_user)
            return;
        }

        const ticket_id = data.split("-ticket")[0];
        router.push("/seller/tickets/" + ticket_id);
        return;

    }
    return (
        <QrScannerButton onValue={qrScan}>Escanear QR</QrScannerButton>
    )
}