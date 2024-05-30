import { NextResponse } from "next/server";
import db from "@/server/db"

export async function POST(
    req: Request
) {
    try {
        const new_tracker = await db.tracker.create(
            {
                data: {
                    kills: 0
                }
            }
        );

        return NextResponse.json({ "data": new_tracker })
    } catch(error) {
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}