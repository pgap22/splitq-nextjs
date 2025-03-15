import prismaDev from "@/db/prismaDev";

export const category = {
  async getCategories() {
    try {
      return await prismaDev.categories.findMany();
    } catch (error) {
      console.log(error);
      return { error: "Hubo un error en el servidor" };
    }
  },
};
