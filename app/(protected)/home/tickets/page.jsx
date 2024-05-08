import { getMyTickets } from "@/actions/getMyTickets";
import BackButton from "@/components/buttons/BackButton";
import TicketsView from "../../../../containers/TicketsView";

export default async function TicketPage() {
  const tickets = await getMyTickets();
  return (
    <>
      <div className="p-4">
        <BackButton href={"/home"} />
        <h1 className="font-bold text-2xl mt-4">Mis Tickets</h1>
      </div>
      <TicketsView tickets={tickets} />
    </>
  );
}
