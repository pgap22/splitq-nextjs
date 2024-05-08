import UpdateAdmin from "@/components/form/FormUpdateAdmin";
import { getUserById } from "@/lib/user";

export default async function UpdateProfile({params}) {
    
    const {id} = params
    const perfil = await getUserById(id)

    const name = perfil.name
    const email = perfil.email
    const password = perfil.password
    const role = perfil.role
    const freezebalance = perfil.freezebalance
    const balance = perfil.balance

    
    return (
        <div>
            <UpdateAdmin name={name} email={email} password={password} role={role} id={id} balance={balance} freezebalance={freezebalance}/>
        </div>
    )
}