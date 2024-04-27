import { NextResponse, NextRequest } from "next/server";

import { customInitApp } from "@/src/utils/firebase/firebase-admin.config";

const admin = require("firebase-admin");

export const GET = async (req: NextRequest) => {
  try {
    await customInitApp();
    const { searchParams } = new URL(req.url);
    const field = searchParams.get("field");
    const db = admin.database();
    const modelsRef = db.ref(field);
    await modelsRef.push({ timeStamp: Date.now() });

    return NextResponse.json({ success: true, message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Failed to update downloads in database", error);

    return NextResponse.json({ success: false, message: "Failed to update downloads in database" }, { status: 500 });
  }
}
