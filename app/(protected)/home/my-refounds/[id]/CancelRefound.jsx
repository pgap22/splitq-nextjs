"use client";

import { cancelRefoundById } from "@/actions/cancelRefoundById";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function CancelRefound({ id }) {
  const [loading, startSubmiting] = useTransition();
  const [openwaring, setWarning] = useState();
  const router = useRouter();

  const confirmCancel = () => {
    startSubmiting(async () => {
      const result = await cancelRefoundById(id);

      if (result?.error) {
        return;
      }

      router.push("/home/my-refounds")
    });
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4">
        <Button onClick={() => setWarning(true)} className="w-full font-bold">
          Cancelar Rembolso
        </Button>
      </div>

      <Dialog open={openwaring} onOpenChange={setWarning}>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>Deseas cancelar el rembolso ?</DialogTitle>
            <DialogDescription>
              Si cancelas el rembolso, se te devolvera tu dinero
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cerrar</Button>
            </DialogClose>
            <Button
              onClick={confirmCancel}
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
