
import { authOptions } from "@/app/lib/authOptions";
import prisma from "@/app/lib/db";
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

    const body = taskSchema.safeparse(req.json());
    if (!body.success) {
        return NextResponse.json({
            message:"Wrong task Inputs"
        }, {
            status:401
        })
    }
    const { title, description,status, tags, startDate, endDate } = body.data;

    try {
        const task = await prisma.task.create({
            data: {
                title,
                description,
                status,
                tags,
                startDate,
                endDate
            }
        })
        return NextResponse.json({
            message: "New task is created",
            task
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
        const task = await prisma.task.findMany()
        return NextResponse.json({
            message: "all Task fetch successfully ",
            task
        }, {
            status:200
        })
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            message:"Internal Server error"
        }, {
            status:500
        })
    }
}
