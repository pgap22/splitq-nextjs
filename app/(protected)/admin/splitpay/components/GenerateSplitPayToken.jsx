"use client";
import { useState, useCallback, useTransition } from "react";
import { generateNewSplitPayToken } from "@/actions/generateNewSplitPayToken";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MdOutlineCopyAll } from "react-icons/md";

export default function GenerateSplitPayToken({ id }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [splitpayToken, setSplitpayToken] = useState("");
    const [tokenCopied, setTokenCopied] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleGenerateToken = () => {
        startTransition(async () => {
            try {
                const token = await generateNewSplitPayToken(id);
                setSplitpayToken(token);
                setIsDialogOpen(true);
            } catch (error) {
                console.error("Error generating token:", error);
            }
        });
    };

    const handleCopyToken = useCallback(() => {
        navigator.clipboard.writeText(splitpayToken)
            .then(() => setTokenCopied(true))
            .catch((err) => console.error("Failed to copy token:", err));
    }, [splitpayToken]);

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSplitpayToken("");
        setTokenCopied(false);
    };

    return (
        <>
            <Button disabled={isPending} onClick={handleGenerateToken} className="w-full">
                {isPending ? <Loader /> : "Generar Nuevo Token"}
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
                <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle>Nuevo Token Generado!</DialogTitle>
                        <DialogDescription>
                            Guarda este token para configurarlo a tu dispositivo SplitPay!
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <p className="break-all"><span className="font-bold">Token</span>: {splitpayToken}</p>
                        <Button onClick={handleCopyToken} className="w-full mt-2">
                            {tokenCopied
                                ? "Se ha copiado el token!"
                                : <><MdOutlineCopyAll size={24} /> Copiar token</>
                            }
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
