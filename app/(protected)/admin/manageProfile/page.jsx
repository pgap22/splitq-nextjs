import { getProfile } from "@/actions/getProfile";
import ContainerManageProfile from "@/containers/ViewProfiles";

export default async function ManageProfile() {
    const profile = await getProfile()

    return(
        <ContainerManageProfile perfiles={profile}/>
        
    )
}