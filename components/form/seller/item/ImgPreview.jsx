import deleteItemImage from "@/actions/seller/items/deleteItemImage";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { MdOutlineDelete } from "react-icons/md";

export const ImgPreview = ({ img }) => {
    const [open, setOpen] = useState(false)

    const [loadingDelete, startDeleting] = useTransition();

    const handleDelete = (public_id) => {

        startDeleting(async () => {
            const result = await deleteItemImage(public_id, img.url);
            if (result?.error) {
                return;
            }
            setOpen(false)
        })
    }

    return (
        <>
            <div className="mt-4 grid grid-cols-[1fr_max-content] items-center">
                <div className="flex gap-2 items-center">
                    <img className="w-12 h-12  object-contain rounded" src={img.url} />
                    <p className="text-sm max-w-[30ch] truncate font-bold">{img.url.split("/")[img.url.split("/").length - 1]}</p>
                </div>
                <MdOutlineDelete onClick={() => setOpen(true)} size={24} />
            </div>

            <Dialog open={open} onOpenChange={(e) => {
                if (loadingDelete) return
                setOpen(e)
            }}>
                <DialogContent
                    onInteractOutside={(e) => {
                        e.preventDefault();
                    }}
                >
                    <DialogHeader>
                        Estas seguro de eliminar esta imagen ?
                    </DialogHeader>
                    <DialogDescription>
                        Esta accion no se puede deshacer, la imagen se perdera !
                    </DialogDescription>
                    <DialogFooter className={"flex gap-2"}>
                        <Button onClick={() => handleDelete(img.public_id)} disabled={loadingDelete} className="!bg-danger-action !text-white">{
                            loadingDelete
                                ? <Loader invert />
                                : "Eliminar"
                        }</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}