// backend/api/[storeId]/users.ts

import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();
    const { name, email, password, cpf, phone } = body;

    // Validations...

    const existingName = await prismadb.user.findFirst({
      where: {
        name,
        storeId: params.storeId
      }
    });

    const existingEmail = await prismadb.user.findFirst({
      where: {
        email,
        storeId: params.storeId
      }
    });

    const existingPhone = await prismadb.user.findFirst({
      where: {
        phone,
        storeId: params.storeId
      }
    });

    const existingCpf = await prismadb.user.findFirst({
      where: {
        cpf,
        storeId: params.storeId
      }
    });

    if (existingName) {
      return new NextResponse("Name is already in use", { status: 400 });
    }

    if (existingEmail) {
      return new NextResponse("Email is already in use", { status: 400 });
    }

    if (existingPhone) {
      return new NextResponse("Phone is already in use", { status: 400 });
    }

    if (existingCpf) {
      return new NextResponse("CPF is already in use", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      }
    });

    const user = await prismadb.user.create({
      data: {
        storeId: params.storeId,
        name,
        email,
        password,
        cpf,
        phone,
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log('[USER_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const users = await prismadb.user.deleteMany({
      where: {
        storeId: params.storeId
      }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log('[USER_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const users = await prismadb.user.findMany({
      where: {
        storeId: params.storeId
      }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log('[USER_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
