import { useContext } from "react";
import { UserDetailContext } from "@/store/UserDetailContext";

export function useUserDetail(){
    return useContext(UserDetailContext);
}