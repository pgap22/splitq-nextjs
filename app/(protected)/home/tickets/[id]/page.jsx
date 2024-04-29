import { getTicketById } from "@/actions/getTicketById";
import BackButton from "@/components/buttons/BackButton";
import dayjs from "dayjs";
import { redirect } from "next/navigation";
import QRCode from "react-qr-code";

export default async function TicketInfoPage({ params }) {
  const ticket = await getTicketById(params.id);

  if (!ticket) return redirect("/home");

  const { product } = ticket;
  console.log(ticket);
  return (
    <main className="p-4">
      <BackButton href={"/home/tickets"} />
      <div className="mt-4 ">
        {ticket.claimedAt ? (
          <div className="border text-text-secundary w-fit my-1 border-border text-xs p-1 rounded bg-foreground">
            Canejado {dayjs(ticket.claimedAt).format("DD/MM/YYYY hh:mm:ss A")}
          </div>
        ) : (
          <div className="bg-white p-4 w-fit mx-auto">
            <QRCode value={ticket.ticket_qr} />
          </div>
        )}

        <div className="flex flex-col mt-4">
          <h1 className="font-bold text-3xl">{product.name}</h1>
          <p className="text-text-secundary text-lg mt-2 font-bold">
            {product.seller.name}
          </p>
          <p className="text-text-secundary mt-4">{product.description}</p>
        </div>
        <p className="font-bold text-lg">
          Cantidad de productos: {ticket.quantity}
        </p>
      </div>
    </main>
  );
}
