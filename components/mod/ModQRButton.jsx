"use client"
import { redirectUser } from "@/actions/redirectUser";
import QrScannerButton from "../qrScannerButton";

export default function ModQRButton() {
 
    return (
        <QrScannerButton onValue={redirectUser}>
            Escanear QR
        </QrScannerButton>
    )
}