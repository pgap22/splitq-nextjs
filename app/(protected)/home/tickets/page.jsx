import BackButton from "@/components/buttons/BackButton";
import TicketsView from "../../../../containers/TicketsView";
import { auth } from "@/auth";
import { getMyTickets } from "@/actions/getMyTickets";

export const dynamic = "force-dyanmic"

export default async function TicketPage() {
  const session = await auth();
  const tickets = await getMyTickets();
  return (
    <>
      <div className="p-4">
        <BackButton prefetch={true} href={"/home"} />
        <h1 className="font-bold text-2xl mt-4">Mis Tickets</h1>
      </div>
      <TicketsView initialTickets={tickets} user_id={session.user.id} />
    </>
  );
}
