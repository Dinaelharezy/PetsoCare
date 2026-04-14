import { NextResponse } from "next/server"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/reports/${params.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  )

  const data = await res.text()
  return NextResponse.json(data)
}