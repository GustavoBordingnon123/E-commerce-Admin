import prismadb from "@/lib/prismadb";

import { ProductForm } from "./components/productForms";

const ProductPage = async ({
  params
}: {
  params: { productId: string, storeId: string}
}) => {
  
  const product = await prismadb.product.findFirst({
    where:{
      id: params.productId,
    },
    include:{
      images:true
    }
  })

  const categories = await prismadb.category.findMany({
    where:{
      storeId: params.storeId,
    },
  })

  const authors = await prismadb.author.findMany({
    where:{
      storeId: params.storeId,
    },
  })

  const publishers = await prismadb.publisher.findMany({
    where:{
      storeId: params.storeId,
    },
  })

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm 
          categories={categories}
          authors={authors}
          publishers={publishers}
          initialData={product} 
        />
      </div>
    </div>
  );
}

export default ProductPage;