import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
    req: Request
){
    try {
        
        const { userId } = auth();

        if (!userId) {
            new NextResponse("UnAuthorized User", {status: 401})
        }

        const allMuseum = await db.museum.findMany();

        return NextResponse.json(allMuseum, {
            status: 200,
        });

    } catch (error) {
        console.log("[SOMETHING WENT WRONG]",error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}

export async function POST(
    req: Request
){
    try {
        
        const { userId } = auth();
        const body = await req.json();
        const {id} = body;

        if (!userId) {
            new NextResponse("UnAuthorized User", {status: 401})
        }

        const museum = await db.museum.findFirst({
            where:{
                id: id
            }
        });

        return NextResponse.json(museum, {
            status: 200,
        });

    } catch (error) {
        console.log("[SOMETHING WENT WRONG]",error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}