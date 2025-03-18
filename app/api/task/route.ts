import { authOptions } from "@/app/lib/authOptions";
import prisma from "@/app/lib/db";
import { taskSchema } from "@/app/Schema/type";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

  const body = taskSchema.safeParse(await req.json());
  if (!body.success) {
    return NextResponse.json(
      {
        message: "Wrong task Inputs",
      },
      {
        status: 401,
      }
    );
  }
  const {
    title,
    description,
    status,
    tags,
    startDate,
    endDate,
    AuthorUserId,
    assignedUserId,
    projectId,
  } = body.data;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        tags,
        startDate,
        endDate,
        AuthorUserId,
        assignedUserId,
        projectId,
      },
    });
    return NextResponse.json(
      {
        message: "New task is created",
        task,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}

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
  const projectId = searchParams.get("projectId");

  if (!projectId) {
    return NextResponse.json(
      {
        message: "Wrong projectId",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const task = await prisma.task.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        author: true,
        assigned: true,
        comment: true,
      },
    });
    return NextResponse.json(
      {
        message: "all Task fetch successfully ",
        task,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Internal Server error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req: NextRequest) {
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

  const body = await req.json();
  const { taskId, status } = body;
  if (!taskId || !status) {
    return NextResponse.json(
      {
        message: "Wrong TaskId or status",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const UpdateTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status: body.status,
      },
    });
    return NextResponse.json(
      {
        message: "all Task fetch successfully ",
        UpdateTask,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Internal Server error",
      },
      {
        status: 500,
      }
    );
  }
}

