

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from '../../../../../lib/auth'  

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()  
  const { id } = await params;
  const formData = await request.formData();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/clinics/${id}`,
    {
      method: "PUT",
      headers: { 
        "ngrok-skip-browser-warning": "true",
        'Authorization': `Bearer ${session?.user?.accessToken ?? ''}`, 
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const text = await response.text();
    return NextResponse.json({ error: text }, { status: response.status });
  }

  // ✅ بيكسر الـ cache
  revalidatePath('/');
  revalidatePath('/main/Home');
  revalidatePath('/admin/dashboard');
  revalidatePath('/admin/clinics');

  const text = await response.text();
  if (!text || text.trim() === "") return NextResponse.json({ success: true });

  try {
    return NextResponse.json(JSON.parse(text));
  } catch {
    return NextResponse.json({ success: true });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()  
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/clinics/${id}`,
    {
      method: "DELETE",
      headers: { 
        "ngrok-skip-browser-warning": "true",
        'Authorization': `Bearer ${session?.user?.accessToken ?? ''}`, 
      },
    }
  );

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to delete" }, { status: response.status });
  }

  // ✅ بيكسر الـ cache
  revalidatePath('/');
  revalidatePath('/main/Home');
  revalidatePath('/admin/dashboard');
  revalidatePath('/admin/clinics');

  return NextResponse.json({ success: true });
}
