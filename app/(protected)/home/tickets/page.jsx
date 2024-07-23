import BackButton from "@/components/buttons/BackButton";
import TicketsView from "../../../../containers/TicketsView";
import { auth } from "@/auth";


export default async function TicketPage() {
  const session = await auth();
  return (
    <>
      <div className="p-4">
        <BackButton href={"/home"} />
        <h1 className="font-bold text-2xl mt-4">Mis Tickets</h1>
      </div>
      <TicketsView user_id={session.user.id} />
    </>
  );
}
