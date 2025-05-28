import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Drop from "@/models/Drop";

// GET all drops
export async function GET() {
  try {
    await connectDB();

    // find all drop documents
    const drops = await Drop.find({});

    // respond with the data
    return NextResponse.json(
      {
        success: true,
        data: drops,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error fetching drops:", error);
    return NextResponse.json(
      {
        success: false,
        error: "failed to fetch drops",
      },
      { status: 500 }
    );
  }
}

// POST create new drop - testing
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const newDrop = await Drop.create(body);
    console.log(newDrop);

    return NextResponse.json({ success: true, data: newDrop }, { status: 201 });
  } catch (error) {
    console.log("error creating drop:", error);
    return NextResponse.json(
      { success: false, error: "failed to create drop" },
      { status: 500 }
    );
  }
}
