import { format } from "date-fns";

import prismadb from "@/lib/prismadb"

import { PublisherClient } from "./components/client"
import { PublisherColumn } from "./components/columns";

const PublishersPage = async({params}: {params:{storeId:string}}) => {

    const publishers = await prismadb.publisher.findMany({
        where:{
            storeId: params.storeId
        }
    });

    const formattedPublisher: PublisherColumn[] = publishers.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMM do, yyyy")
    }));

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <PublisherClient data={formattedPublisher} />
            </div>
        </div>
    )
}

export default PublishersPage;