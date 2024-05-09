import { getCheckout } from "@/actions/getCheckout";
import BackButton from "@/components/buttons/BackButton";
import Checkout from "./Checkout";
export default async function CheckoutPage() {
  const checkoutData = await getCheckout();
  return (
    <>
      <main className="p-4">
        <BackButton href="/home/cart"/>
        <Checkout checkoutData={checkoutData} />
      </main>
    </>
  );
}

