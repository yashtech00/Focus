import { authOptions } from "@/app/lib/authOptions";
import prisma from "@/app/lib/db";
import { projectSchema } from "@/app/Schema/type";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({
            message:"User not found"
        }, {
            status:401
        })
    }

    const body = projectSchema.safeParse(await req.json());
    if (!body.success) {
        return NextResponse.json({
            message:"Wrong project Inputs"
        }, {
            status:401
        })
    }
    const { title, description, startDate, endDate } = body.data;

    try {
        const project = await prisma.project.create({
            data: {
                title,
                description,
                startDate,
                endDate
            }
        })
        return NextResponse.json({
            message:"New project is created"
        }, {
            status:200
        })
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            message:"Internal server error"
        }, {
            status:500
        })   
    }  
}

export async function GET(req:NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({
            message:"User not found"
        }, {
            status:401
        })
    }
    // const url = new URL(req.url)
    // const searchParams = new URLSearchParams(url.search);
    // const id = searchParams.get("id");

    try {
        const project = await prisma.project.findMany()
        return NextResponse.json({
            message: "all Project fetch successfully ",
            project
        }, {
            status:200
        })
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            message:"Internal server error"
        }, {
            status:500
        })
    }
}
