

import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const body = await req.json();

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}