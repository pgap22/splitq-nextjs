import NavLayout from "@/containers/layouts/NavLayout";

export default async function UserLayout({ children }) {
  return (
    <NavLayout>
      {children}
    </NavLayout>
  );
}
