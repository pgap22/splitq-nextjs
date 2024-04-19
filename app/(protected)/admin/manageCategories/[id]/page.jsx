import { getCategories } from "@/actions/categories"
import { getCategorieById } from "@/actions/getCategoryById"
import FormUpdateCategories from "@/components/form/FormUpdateCategorie"

export default async function UpdateCategorie({params}) {
    const {id} = params
    const categorias = await getCategorieById(id)
    const name = categorias.name
    const AllCategories = await getCategories()
        
    return(
            <div>
                <FormUpdateCategories name={name} id={id} AllCategories={AllCategories} categorias={categorias}/>
            </div>
        )

}