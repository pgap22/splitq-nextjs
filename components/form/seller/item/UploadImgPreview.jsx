import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import Image from "next/image";

export const UploadImgPreview = ({
    openPreviewImage,
    setOpenPreivewImage,
    imgUploadPreview,
    loadingUpload,
    uploadImage,
}) => {
    return (
        <>
            <Dialog open={openPreviewImage} onOpenChange={(e) => {
                if (loadingUpload) return
                setOpenPreivewImage(e);
            }}>
                <DialogContent
                    onInteractOutside={(e) => {
                        e.preventDefault();
                    }}
                >
                    <DialogHeader>
                        Subida de imagen
                    </DialogHeader>
                    <DialogDescription>Deseas subir esta imagen para el producto?</DialogDescription>
                    {imgUploadPreview && <Image width={200} height={40} className="w-full aspect-square rounded object-contain" src={URL.createObjectURL(imgUploadPreview)} alt="" />
                    }
                    <Button disabled={loadingUpload} onClick={uploadImage}>{
                        loadingUpload
                            ? <Loader />
                            : "Subir imagen"
                    }</Button>
                    <DialogClose asChild disabled={loadingUpload} className="w-full">
                        <Button disabled={loadingUpload} variant="outline" className="w-full">Cerrar</Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>

         
        </>
    )
}