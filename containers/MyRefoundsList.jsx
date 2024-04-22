"use client";

import { IconTabs } from "@/components/icon-tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import {
  MdOutlineAlarm,
  MdOutlineBlock,
  MdOutlineCheckCircle,
} from "react-icons/md";

export default function MyRefoundsList({ refounds }) {
  const [itemtype, setItemType] = useState("pending");

  return (
    <>
      <div className="mt-4 grid grid-cols-3 border-b border-border mb-4">
        <IconTabs
          setItemType={setItemType}
          active={itemtype}
          type={"pending"}
          label={"Pendientes"}
          Icon={MdOutlineAlarm}
        />
        <IconTabs
          setItemType={setItemType}
          active={itemtype}
          type={"accepted"}
          label={"Aceptadas"}
          Icon={MdOutlineCheckCircle}
        />
        <IconTabs
          setItemType={setItemType}
          active={itemtype}
          type={"denied"}
          label={"Denegadas"}
          Icon={MdOutlineBlock}
        />
      </div>

      {refounds
        .filter((refounds) => refounds.status == itemtype)
        .map((refound) => (
          <Link href={"/home/my-refounds/"+refound.id}>
            <div className="border-border border-b">
              <div className="p-4 space-y-2">
                <h2 className="font-bold text-md">Solicitud de Saldo</h2>
                <p className="font-bold">
                  Saldo a rembolsar:{" "}
                  <span className="text-gradient font-black bg-gradient-principal">
                    ${refound.refoundBalance}
                  </span>
                </p>
                <StatusRefound status={refound.status} />
              </div>
            </div>
          </Link>
        ))}
    </>
  );
}

export function StatusRefound({ status }) {
  let statusClassname = "";
  let statusLabel = "";
  if (status == "pending") {
    statusClassname = "bg-gray-background border-gray-border text-gray-text";
    statusLabel = "Pendiente";
  }
  if (status == "accepted") {
    statusClassname = "bg-green-background border-green-border text-green-text";
    statusLabel = "Aceptada";
  }
  if (status == "denied") {
    statusClassname = "bg-red-background border-red-border text-red-text";
    statusLabel = "Denegado";
  }

  return (
    <div
      className={cn(
        "p-2 w-fit text-xs rounded border text-white font-bold",
        statusClassname
      )}
    >
      {statusLabel}
    </div>
  );
}
