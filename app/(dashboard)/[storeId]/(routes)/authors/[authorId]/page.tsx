import prismadb from "@/lib/prismadb";

import { AuthorForm } from "./components/authorForms";

const AuthorPage = async ({
  params
}: {
  params: { authorId: string }
}) => {
  
  const author = await prismadb.author.findFirst({
    where:{
      id: params.authorId,
    }
  })

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AuthorForm initialData={author} />
      </div>
    </div>
  );
}

export default AuthorPage;