import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "./ui/drawer";
import { useMediaQuery } from "usehooks-ts";

export default function ControlledModal({ children, open,setOpen, title="", description="", cancelLabel = "Cerrar"}) {
  const isDekstop = useMediaQuery("(min-width: 768px)");

  if (isDekstop)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description}
            </DialogDescription>
          </DialogHeader>
          {children}
          <DialogClose className="w-full">
            <Button className="w-full" variant="outline">{cancelLabel}</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>
            {description}
          </DrawerDescription>
        </DrawerHeader>

        <DrawerFooter>
          {children}
          <DrawerClose className="w-full">
            <Button className="w-full" variant="outline">
              {cancelLabel}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
