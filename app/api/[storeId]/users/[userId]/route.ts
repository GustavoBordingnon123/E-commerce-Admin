import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {

    if (!params.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    const user = await prismadb.user.findFirst({
      where: {
        email: params.userId
      }
    });
  
    return NextResponse.json(user);
  } catch (error) {
    console.log('[USER_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string, storeId: string } }
) {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    if (!params.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    // const storeByUserId = await prismadb.store.findFirst({
    //   where: {
    //     id: params.storeId,
    //     userId
    //   }
    // });

    // if (!storeByUserId) {
    //   return new NextResponse("Unauthorized", { status: 405 });
    // }

    const user = await prismadb.user.delete({
      where: {
        id: params.userId
      }
    });
  
    return NextResponse.json(user);
  } catch (error) {
    console.log('[USER_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { userId: string, storeId: string } }
) {
  try {
    // const { userId } = auth();

    const body = await req.json();

    const { name, email, password, cpf, phone } = body;

    
    if (!email) {
      return new NextResponse("Value is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!password) {
      return new NextResponse("Password is required", { status: 400 });
    }

    if (!cpf) {
      return new NextResponse("CPF is required", { status: 400 });
    }

    if (!phone) {
      return new NextResponse("Phone is required", { status: 400 });
    }
  

    if (!params.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    // const storeByUserId = await prismadb.store.findFirst({
    //   where: {
    //     id: params.storeId,
    //     userId
    //   }
    // });

    // if (!storeByUserId) {
    //   return new NextResponse("Unauthorized", { status: 405 });
    // }

    const user = await prismadb.user.update({
      where: {
        id: params.userId
      },
      data: {
        email:email,
        name:name,
        password:password,
        cpf:cpf,
        phone:phone,
      }
    });
  
    return NextResponse.json(user);
  } catch (error) {
    console.log('[USER_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};