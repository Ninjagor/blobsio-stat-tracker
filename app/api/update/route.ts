import { NextResponse } from "next/server";
import db from "@/server/db"

export async function POST(
    req: Request
) {
    try {
        const body = await req.json();
        const { trackerId } = body;
        const tracker = await db.tracker.findFirst({
            where: {
                id: trackerId
            }
        })
        if (!tracker) {
            return new NextResponse("Tracker with that ID Not found", { status: 404 })
        }

        await db.tracker.update({
            where: {
                id: tracker.id
            },
            data: {
                kills: tracker.kills+1
            }
        })

        return NextResponse.json({ "data": "success" })
    } catch(error) {
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}