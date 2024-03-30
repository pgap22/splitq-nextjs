"use client"

import React, { useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import { animated, useTransition } from "@react-spring/web";
import QrScanner from "qr-scanner";
import Loader from "../Loader";
import IconBox from "../ui/IconBox";
import { MdOutlineArrowBack } from "react-icons/md";
import { cn } from "@/lib/utils";
import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import QRLoader from "../QRLoader";
import { useOnClickOutside } from "usehooks-ts";

export default function QrScannerButton({ children, onValue = () => { } }) {
    const [modal, setModal] = useState(false);
    const [qrReader, setQrReader] = useState()
    const [loadingQRCAM, startQRCAM] = React.useTransition();
    const [loadingCams, startCamList] = React.useTransition();
    const [qrEnabled, setQREnabled] = useState(false);
    const [qrLoaded, setQrLoaded] = useState(false);
    const [errorCAM, setErrorCAM] = useState();
    const [isApple, setAgent] = useState();
   
    const qrRefLoaded = useRef();
    const ref = useRef();

    useOnClickOutside(qrRefLoaded, ()=>{
        setQrLoaded(false)
    })

    const transitionQR = useTransition(modal, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 150 }
    });


    const toggleModal = () => {
        setModal(!modal)
    }

    const startQRScanning = (qrInstance) => {
        startQRCAM(async () => {
            await qrInstance.start();
            setQREnabled(true)
            document.body.style.overflow = "hidden"
        })
    }

    const stopQRScanning = () => {
        document.body.style.overflow = ""

        qrReader.stop();
        setQREnabled(false)
        toggleModal()
    }

    const openModal = () => {
        startCamList(async () => {
            const cameras = await QrScanner.listCameras();
            if (!cameras.length) {
                setErrorCAM(true);
                return;
            }

            toggleModal();
        })

    }

    const onQrFunction = (data)=>{
        setQrLoaded(true)
        document.body.style.overflow = ""
        onValue(data)
    }

    useEffect(() => {

        if (modal && !qrReader) {
            const qrReaderInstance = new QrScanner(ref.current, onQrFunction, { returnDetailedScanResult: true, highlightScanRegion: true, });
            startQRScanning(qrReaderInstance)
            setQrReader(qrReaderInstance)
        }

        if (modal && qrReader) {
            startQRScanning(qrReader)
        }

        setAgent(/(iPhone|iPad|iPod)/i.test(navigator.userAgent))

    }, [modal])

    return (
        <>
            <Dialog open={errorCAM} onOpenChange={setErrorCAM}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>No hay camaras disponibles</DialogTitle>
                        <DialogDescription>SplitQ no tiene acceso a las camaras de tu dipositivo</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <Button disabled={loadingCams} onClick={openModal}>{children}</Button>
            {transitionQR((style, item) => item ? (
                <animated.div className={"bg-background flex justify-center  items-center inset-0 fixed z-10"} style={style}>
                    {loadingQRCAM && <Loader invert />}

                </animated.div>
            ) : "")
            }

            <div className={cn(modal ? "z-10" : "-z-10", "flex items-center fixed inset-0")}>
                <video className={cn(isApple && "w-full h-[80%] object-cover")} ref={ref} id="qr-reader">
                </video>
            </div>

            {
                qrLoaded && (
                    <div  className="fixed z-20 bg-black/70 inset-0 flex justify-center items-center">
                        <di ref={qrRefLoaded} className="rounded-md flex flex-col gap-4 items-center bg-foreground border border-border p-4">
                            <QRLoader invert />
                        </di>
                    </div>
                )
            }

            {qrEnabled && <IconBox onClick={stopQRScanning} variant={"square"} className={"fixed z-10 top-4 left-4"} Icon={MdOutlineArrowBack} />}
        </>
    )
}