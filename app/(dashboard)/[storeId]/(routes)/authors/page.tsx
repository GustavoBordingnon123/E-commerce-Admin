import { format } from "date-fns";

import prismadb from "@/lib/prismadb"

import { AuthorClient } from "./components/client"
import { AuthorColumn } from "./components/columns";

const AuthorsPage = async({params}: {params:{storeId:string}}) => {

    const authors = await prismadb.author.findMany({
        where:{
            storeId: params.storeId
        }
    });

    const formattedAuthor: AuthorColumn[] = authors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMM do, yyyy")
    }));

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <AuthorClient data={formattedAuthor} />
            </div>
        </div>
    )
}

export default AuthorsPage;