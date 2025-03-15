import Loader from "@/components/Loader";
import AlertWarning from "@/components/ui/AlertWarning";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
export const DeleteItemDialog = ({
    confirmDelete,
    loadingDelete,
    submitDeleteProduct,
    setConfirmDelete,
    itemCombos
}) => {
    return (
        <Dialog open={confirmDelete} onOpenChange={(e) => {
            if (loadingDelete) return
            setConfirmDelete(e);
        }}>
            <DialogContent
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
            >
                <DialogHeader>
                    Eliminar Producto
                </DialogHeader>
                <DialogDescription>Deseas subir eliminar este producto?. No podras recuperar la informacion eliminada</DialogDescription>
                {
                    itemCombos?.length && (
                        <AlertWarning
                            title={"Producto incluido en combos !"}
                        />
                    )
                }
                <Button disabled={loadingDelete} onClick={submitDeleteProduct}>{
                    loadingDelete
                        ? <Loader />
                        : "Eliminar Producto"
                }</Button>
                <DialogClose asChild disabled={loadingDelete} className="w-full">
                    <Button disabled={loadingDelete} variant="outline" className="w-full">Cerrar</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}