import { getCheckout } from "@/actions/getCheckout";
import Checkout from "./Checkout";
export default async function CheckoutPage() {
  const checkoutData = await getCheckout();
  return (
    <>
      <main className="p-4">
        <Checkout checkoutData={checkoutData} />
      </main>
    </>
  );
}

