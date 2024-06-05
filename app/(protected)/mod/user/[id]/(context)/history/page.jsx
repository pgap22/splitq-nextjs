import { getHistoryByUserId } from "@/actions/getHistoryByUserId";
import { HistoryUser } from "@/containers/HistoryUser";

export default async function HistoryPage({params}) {
  const history = await getHistoryByUserId(params.id);
  return (
    <HistoryUser history={history}  />
  );
}
