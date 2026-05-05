// app/api/dashboard/shelters/[id]/route.ts

// import { NextRequest, NextResponse } from "next/server";



// export async function PUT(
//   req: NextRequest,
//    { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const body = await req.json();

//     const payload = {
//       name: body.name,
//       governorate: body.governorate,
//       address: body.location,
//       animalType: body.animalType,
//       capacity: body.capacity,
//       phone: body.contactNumber,
//       workingHours: body.workingHours,
//       notes: body.additionalNotes,
//       lat: body.lat ?? null,
//       lng: body.lng ?? null,
//     };

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/shelters/${params.id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       }
//     );

//     const data = await res.json().catch(() => ({}));

//     return NextResponse.json(data, { status: res.status });
//   } catch (err) {
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   _req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/shelters/${params.id}`,
//     {
//       method: "DELETE",
//     }
//   );

//   return NextResponse.json({}, { status: res.status });
// }

import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
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
      lat: body.lat ?? null,
      lng: body.lng ?? null,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/shelters/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json().catch(() => ({}));

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/shelters/${id}`,
    {
      method: "DELETE",
    }
  );

  return NextResponse.json({}, { status: res.status });
}