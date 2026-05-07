

import { NextRequest, NextResponse } from "next/server";
import { auth } from '../../../../lib/auth' 
export async function POST(req: NextRequest) {
  const body = await req.json();
 const session = await auth()  
  const payload = {
    name: body.name,
    governorate: body.governorate,
    address: body.location,
    animalType: body.animalType,
    capacity: body.capacity,
    phone: body.contactNumber,
    workingHours: body.workingHours,
    notes: body.additionalNotes,
    lat: null,
    lng: null,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/shelters`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json",
        'Authorization': `Bearer ${session?.user?.accessToken ?? ''}`, 
       },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}