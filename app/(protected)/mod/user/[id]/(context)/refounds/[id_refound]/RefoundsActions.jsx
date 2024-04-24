"use client";

import { refoundModAction } from "@/actions/refoundModAction";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function RefoundsActions({id, redirect}) {
  const [open, setOpen] = useState(false);
  const [loading, startRefounding] = useTransition();
  const [type, setType] = useState();
  const router = useRouter();


  const confirmAction = () =>{
    startRefounding(async()=>{
        const result = await refoundModAction(type, id);
        if(result?.error){
            return;
        }
        router.push(redirect)
    })
  }

  return (
    <>
      <div className="fixed flex flex-col gap-2 bottom-4 left-4 right-4">
        <Button
          onClick={() => {
            setType("accepted");
            setOpen(true);
          }}
        >
          Aceptar Rembolso
        </Button>
        <Button
          onClick={() => {
            setType("denied");
            setOpen(true);
          }}
          className="!bg-danger-action !text-white"
        >
          Cancelar Rembolso
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>
              {type == "accepted" && "Deseas confirmar este rembolo"}
              {type == "denied" && "Deseas denegar este rembolo"}
            </DialogTitle>
            <DialogDescription>
              {type == "accepted" && "Debes recibir otorgar antes el dinero antes de confirmar"}
              {type == "denied" && "Si deniegas este rembolso, el dinero se le devolvera al usuario"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cerrar</Button>
            </DialogClose>
            <Button
              onClick={confirmAction}
              disabled={loading}
              className="mb-2 md:m-0"
            >
              {loading ? <Loader /> : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
