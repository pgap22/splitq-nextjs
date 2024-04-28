import { getMyTickets } from "@/actions/getMyTickets";
import BackButton from "@/components/buttons/BackButton";
import { MdOutlineLocalOffer } from "react-icons/md";
import TicketsView from "../../../../containers/TicketsView";

export default async function TicketPage() {
  const tickets = await getMyTickets();
  console.log(tickets);
  return (
    <>
      <div className="p-4">
        <BackButton />
        <h1 className="font-bold text-2xl mt-4">Mis Tickets</h1>
      </div>
      <TicketsView tickets={tickets} />
    </>
  );
}
