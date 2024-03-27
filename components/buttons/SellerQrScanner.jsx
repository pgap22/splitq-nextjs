"use client"

import QrScannerButton from "./qrScannerButton"

export default function SellerQRScanner() {
    const qrScan = ({ data }) => {
        alert(data)
    }
    return (
        <QrScannerButton onValue={qrScan}>Escanear QR</QrScannerButton>
    )
}