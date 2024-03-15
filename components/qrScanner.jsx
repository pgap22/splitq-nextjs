"use client"

import QrScanner from "qr-scanner"
import { Button, buttonVariants } from "./ui/button"
import { useState, useTransition } from "react"
import Image from "next/image";


export default function QrScannerButton() {
    const [state, setState] = useState();
    const [image, setImage] = useState();
    const [loading, startTransition] = useTransition()
    const qrScan = (e) => {
        startTransition(async () => {
            const file = window.URL.createObjectURL(e.target.files[0])
            QrScanner.scanImage(file).then(result => console.log(result))
                .catch(error => console.log(error || 'No QR code found.'));
            setImage(file)
        })
    }
    // QrScanner.scanImage

    return (
        <>

            <label className="mb-5" htmlFor="photo-qr">
                <div className={buttonVariants()}>
                    escaneela
                </div>
            </label>
            <input onChange={qrScan} hidden type="file" accept="image/*" id="photo-qr" name="photo-qr" capture="camera" />
            {loading ? "Cargando" : ""}
            {image &&
                <Image src={image} width={200} height={200} />}
        </>
    )
}