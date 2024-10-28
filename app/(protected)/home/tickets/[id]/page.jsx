import { getTicketById } from "@/actions/getTicketById";
import BackButton from "@/components/buttons/BackButton";
import TicketInfoView from "@/components/realtime/TicketInfoView";
import { redirect } from "next/navigation";

// export const dynamic = 'force-dynamic'

export default async function TicketInfoPage({ params }) {

  const ticket = await getTicketById(params.id);

  if (!ticket) return redirect("/home");

  if (ticket?.error) return <p>Hubo un error con el servidor. Recarga la pagina</p>

  console.log(ticket.request_refund)

  return (
    <main className="p-4 grid grid-rows-[max-content_1fr]  min-h-screen">
      <BackButton href={"/home/tickets"} />
      <TicketInfoView ticket={ticket} />
    </main>
  );
}
