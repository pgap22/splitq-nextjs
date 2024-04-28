import NavLayout from "@/containers/layouts/NavLayout";

export default async function QueryLayout({ children }) {
  return (
    <NavLayout>
      {children}
    </NavLayout>
  );
}
