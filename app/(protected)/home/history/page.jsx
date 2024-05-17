import { getHistoryByUserId } from "@/actions/getHistoryByUserId";
import BackButton from "@/components/buttons/BackButton";
import { authUser } from "@/lib/authUser";
import showEsDate from "@/lib/showEsDate";
import ActionItem from "./ActionItem";

export default async function HistoryPage() {
  const { id } = await authUser();
  const history = await getHistoryByUserId(id);
  return (
    <>
      <main>
        <div className="p-4">
          <BackButton href={"/home"} />
          <h1 className="font-bold my-4 text-2xl">Historial de Acciones</h1>
          {history.map((day) => (
            <div className="border border-border mb-4 rounded-md bg-foreground">
              <p className="font-bold px-4 mt-4 pb-0 text-text-secundary capitalize text-lg">
                {showEsDate(day.date, false)}
              </p>
              {day.actions.map((action) => (
               <ActionItem action={action} />
              ))}
            </div>
          ))}
        </div>

      </main>
    </>
  );
}
