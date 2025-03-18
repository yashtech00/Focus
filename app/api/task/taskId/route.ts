import { authOptions } from "@/app/lib/authOptions";
import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 401,
        }
      );
    }
  
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const userId = searchParams.get("userId");
  
    try {
      const userTask = await prisma.task.findMany({
        where: {
              OR: [
                  { AuthorUserId: userId ?? "" },
                  { assignedUserId: userId ?? "" }
              ],
        },
        include: {
          author: true,
          assigned: true,
        },
      });
        return NextResponse.json({
            message: "fetch user task successfully",
            userTask
        }, {
            status:200
        })
    } catch (e: any) {
      console.error(e);
      return NextResponse.json(
        {
          message: `Internal server error ${e.message}`,
        },
        {
          status: 500,
        }
      );
    }
  }
  