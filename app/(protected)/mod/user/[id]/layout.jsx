import { UserDetailProvider } from "../../../../../store/UserDetailContext";

export default function UserDetailLayout({ children }) {
    return (
        <UserDetailProvider>
            {children}
        </UserDetailProvider>
    )
}