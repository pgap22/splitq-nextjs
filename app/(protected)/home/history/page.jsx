import { getHistoryByUserId } from "@/actions/getHistoryByUserId";
import { authUser } from "@/lib/authUser";
import { HistoryUser } from "@/containers/HistoryUser";

export default async function HistoryPage() {
  const { id } = await authUser();
  const history = await getHistoryByUserId(id);
  return (
    <HistoryUser history={history} />
  );
}
