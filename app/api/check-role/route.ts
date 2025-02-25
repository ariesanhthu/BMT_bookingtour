import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { checkRole } from "@/utils/roles";

export async function GET(request: Request) {
  // Option 1: Use your server-only checkRole function
  if (!checkRole("admin")) {
    return NextResponse.json({ isAdmin: false });
  }
  
  // Option 2: Alternatively, if you need to get more user data, use clerkClient.
  // const user = await clerkClient.users.getUser(userId); // example
  // const isAdmin = user.publicMetadata.role === "admin";
  
  return NextResponse.json({ isAdmin: true });
}
