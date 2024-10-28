import { getHistoryByUserId } from "@/actions/getHistoryByUserId";
import { authUser } from "@/lib/authUser";
import { HistoryUser } from "@/containers/HistoryUser";

export default async function HistoryPage() {
  const { id } = await authUser();
  const history = await getHistoryByUserId(id);
  console.log(history[0].actions)
  return (
    <HistoryUser href={"/home"} history={history} />
  );
}
