"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";	
import { DataTable } from "@/components/ui/dataTable";
import { ApiList } from "@/components/ui/apiList";
import { OrderColumn, columns } from "./columns";


interface OrderClientProps {
    data: OrderColumn[];
}

export const OrderClient:React.FC<OrderClientProps> = ({data}) => {
    return(
        <>
            <Heading title={`Orders: (${data.length})`} description="Manage orders for your store" />
            <Separator />
            <DataTable searchKey="products" columns={columns} data={data} />
        </>
    )
}