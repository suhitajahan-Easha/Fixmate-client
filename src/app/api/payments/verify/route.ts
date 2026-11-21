
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  
  try {
     const jwttoken=await auth.api.getToken({
            headers:await headers()
      })
      
      const token=jwttoken?.token
      
      if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    const { sessionId } = await request.json();

    if (!sessionId) {
      
      return NextResponse.json(
        { success: false, message: "Session ID is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payments/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization:`Bearer ${token}`,
        },
        body: JSON.stringify({ sessionId }),
        cache: "no-store",
      }
    );

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("Payment verification error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
