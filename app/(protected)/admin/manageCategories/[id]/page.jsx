import { getCategories } from "@/actions/categories"
import { getCategorieById } from "@/actions/getCategoryById"
import FormUpdateCategories from "@/components/form/FormUpdateCategorie"

export default async function UpdateCategorie({params}) {
    const categorias = await getCategorieById(params.id)
    const AllCategories = await getCategories()
        
    return(
            <div>
                <FormUpdateCategories name={categorias.name} id={params.id} AllCategories={AllCategories} categorias={categorias}/>
            </div>
        )

}