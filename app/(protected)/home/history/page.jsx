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
              <div className="flex gap-4 mt-4 items-center">
                <p className="font-bold px-4 pb-0 text-text-secundary capitalize text-lg">
                  {showEsDate(day.date, false)}
                </p>
                <div className="flex gap-2">
                  <p className="font-bold ">Dinero Gastado: <span className="text-red-500">${day.actions.filter(action => action.type == "purchase").reduce((total, action)=>(total+action.value.price),0)}</span></p>
                  <p className="font-bold">Saldo recibido: <span className="text-green-500">${day.actions.filter(action => action.type == "recharge").reduce((total, action)=>(total+action.value),0)}</span></p>
                </div>
              </div>
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
