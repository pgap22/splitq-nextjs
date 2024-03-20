import { UserDetailProvider } from "../../../../../contexts/UserDetailContext";

export default function UserDetailLayout({ children }) {
    return (
        <UserDetailProvider>
            {children}
        </UserDetailProvider>
    )
}