import { getMyTickets } from "@/actions/getMyTickets";
import BackButton from "@/components/buttons/BackButton";
import { MdOutlineLocalOffer } from "react-icons/md";

export default async function TicketPage() {
  const tickets = await getMyTickets();
  console.log(tickets);
  return (
    <>
      <BackButton />
      <h1 className="font-bold text-2xl mt-4">Mis Tickets</h1>
    </>
  );
}

const CardProduct = ({ product }) => {
  return (
    <div className="border-b last:border-none flex p-2 gap-2 border-border w-full">
      {product?.images && product?.images.length ? (
        <img
          className="max-h-16 aspect-square object-cover rounded border border-border"
          src={product.images[0].url}
        />
      ) : (
        <div className="h-16 aspect-square border border-border flex items-center justify-center">
          <MdOutlineLocalOffer size={30} />
        </div>
      )}
      <div className="flex flex-row justify-between w-full items-center">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg">{product.name}</h1>
          <p className="text-xs text-text-secundary">{product.seller.name}</p>
        </div>
      </div>
    </div>
  );
};
