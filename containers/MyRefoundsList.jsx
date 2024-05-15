"use client";

import StatusRefound from "@/components/StatusRefound";
import { IconTabs } from "@/components/icon-tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import {
  MdOutlineAlarm,
  MdOutlineBlock,
  MdOutlineCancel,
  MdOutlineCheckCircle,
} from "react-icons/md";

export default function MyRefoundsList({
  refounds,
  redirect = "/home/my-refounds/",
}) {
  const [itemtype, setItemType] = useState("pending");
  console.log(refounds)
  return (
    <>
      <div className="mt-4 grid grid-cols-4 border-b border-border mb-4">
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
        <IconTabs
          setItemType={setItemType}
          active={itemtype}
          type={"canceled"}
          label={"Canceladas"}
          Icon={MdOutlineCancel}
        />
      </div>

      {refounds
        .filter((refounds) => refounds.status == itemtype)
        .map((refound) => (
          <Link href={redirect + refound.id}>
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

