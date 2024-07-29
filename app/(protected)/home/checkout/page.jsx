import { getCheckout } from "@/actions/getCheckout";
import BackButton from "@/components/buttons/BackButton";
import Checkout from "./Checkout";
export default async function CheckoutPage() {
  const checkoutData = await getCheckout();
  console.log(checkoutData)
  return (
    <>
      <main className="p-4">
        <Checkout checkoutData={checkoutData} />
      </main>
    </>
  );
}

