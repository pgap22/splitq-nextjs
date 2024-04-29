"use client"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";

export default function FormSearch() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const search = ({ query }) => {
    router.push("/home/search/" + query);
  };
  return (
    <form onSubmit={handleSubmit(search)} className="w-full">
      <Input
        {...register("query")}
        type="search"
        className="w-full"
        placeholder="Buscar producto"
      />
    </form>
  );
}
