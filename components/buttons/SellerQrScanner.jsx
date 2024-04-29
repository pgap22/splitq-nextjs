"use client"

import { useRouter } from "next/navigation"
import QrScannerButton from "./qrScannerButton"

export default function SellerQRScanner() {
    const router = useRouter();
    const qrScan = ({ data }) => {
        router.push("/seller/tickets/"+data)
    }
    return (
        <QrScannerButton onValue={qrScan}>Escanear QR</QrScannerButton>
    )
}