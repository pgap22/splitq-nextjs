import { cn } from "@/lib/utils";

export default function StatusRefound({ status }) {
    let statusClassname = "";
    let statusLabel = "";
    if (status == "pending") {
      statusClassname = "bg-gray-background border-gray-border text-gray-text";
      statusLabel = "Pendiente";
    }
    if (status == "canceled") {
      statusClassname = "bg-gray-background border-gray-border text-gray-text";
      statusLabel = "Cancelada";
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
  