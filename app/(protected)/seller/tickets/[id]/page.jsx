import { getTicketByQR } from "@/actions/getTicketByQR";
import BackButton from "@/components/buttons/BackButton";
import IconBox from "@/components/ui/IconBox";
import { redirect } from "next/navigation";
import { MdOutlineFastfood, MdOutlineLocalPizza } from "react-icons/md";
import TicketConfirm from "./TicketConfirm";
import dayjs from "dayjs";

export default async function TicketSellerPage({ params }) {
  const ticket = await getTicketByQR(params.id);

  if (!ticket) return redirect("/seller");

  return (
    <main className="p-4">
      <BackButton href={"/seller"} />
      <p className="font-bold text-lg mt-4">
        {ticket.user.name} {ticket.user.lastname}
      </p>
      <div className="border border-border rounded mt-4 p-2 bg-foreground">
        <div className="flex items-center gap-2">
          <IconBox
            Icon={
              !!ticket.product.products
                ? MdOutlineFastfood
                : MdOutlineLocalPizza
            }
          />
          <p>{ticket.product.name}</p>
        </div>
        <div className="mt-4">
          <p className="font-bold text-text-secundary">
            Cantidad: {ticket.quantity}
          </p>
        </div>
      </div>
      {ticket.ticket_redeem && (
        <div className="mt-4">
          <p>Este ticket ya ha sido canjeado</p>
          <div className="border text-text-secundary w-fit my-1 border-border text-xs p-1 rounded bg-foreground">
            Hora de canejeo: {dayjs(ticket.claimedAt).format("DD/MM/YYYY hh:mm:ss A")}
          </div>
        </div>
      )}
      <TicketConfirm ticket={ticket} />
    </main>
  );
}
