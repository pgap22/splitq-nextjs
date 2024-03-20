import { useContext } from "react";
import { UserDetailContext } from "@/contexts/UserDetailContext";

export function useUserDetail(){
    return useContext(UserDetailContext);
}