import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { path, tag } = await req.json();

    if (tag) {
      revalidateTag(tag); 
    } else if (path) {
      revalidatePath(path); 
    } else {
      revalidatePath("/"); 
    }

    return NextResponse.json({ message: "Revalidation triggered" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
