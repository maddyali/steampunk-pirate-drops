import connectDB from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    return Response.json({ message: "✅ MongoDB connected via Mongoose" });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    return Response.json(
      { error: "❌ MongoDB connection failed" },
      { status: 500 }
    );
  }
}
