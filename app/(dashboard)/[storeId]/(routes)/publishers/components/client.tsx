"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";	
import { DataTable } from "@/components/ui/dataTable";
import { ApiList } from "@/components/ui/apiList";
import { PublisherColumn, columns } from "./columns";


interface PublisherClientProps {
    data: PublisherColumn[];
}

export const PublisherClient:React.FC<PublisherClientProps> = ({data}) => {

    const router = useRouter();
    const params = useParams();

    return(
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Publishers: (${data.length})`} description="Manage publishers for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/publishers/new`)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API Calls for Publishers" />
            <Separator />
            <ApiList entityName="publishers" entityIdName="publisherId" />
        </>
    )
}