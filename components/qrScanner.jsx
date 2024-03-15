"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Button } from "./ui/button"
import { animated, useTransition } from "@react-spring/web";
import QrScanner from "qr-scanner";
import { cn } from "@/lib/utils";


export default function QrScannerButton() {
    const [modal, setModal] = useState(false);
    const [qrReader, setQrReader] = useState()
    const ref = useRef();
    const transitionQR = useTransition(modal, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 150 }
    });

    const toggleModal = () => {
        setModal(!modal)
    }

    useEffect(()=>{
        if(modal){
            const qrReader = new QrScanner(ref.current, (result)=> console.log(result), {returnDetailedScanResult: true});
            setQrReader(qrReader)
        }
    },[modal])

    return (
        <>
            <Button onClick={toggleModal}>Escaneela</Button>
            {transitionQR((style, item) => item ? (
                <animated.div className={"bg-background inset-0 fixed z-10"} style={style}>
                    <Button onClick={()=>{qrReader.start()}}>adkwopdkawopd</Button>
                </animated.div>
            ) : "")
            }

            <video ref={ref} id="qr-reader" className={cn("absolute bottom-0 left-1/2 aspect-square bg-red-500 -translate-x-1/2 -translate-y-1/2 z-10")}></video>
        </>
    )
}