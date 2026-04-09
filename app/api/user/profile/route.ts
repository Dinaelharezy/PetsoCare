import { NextResponse } from "next/server"
import { auth } from "../../../../lib/auth" 

export async function GET() {
  const session = await auth()  
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 })
  }

  const { user } = session

  return NextResponse.json({
    id:    user.id,
    name:  user.name,
    email: user.email  ?? "",
    image: user.image  ?? "/woman.png",
    role:  user.role   ?? "User",
  })
}

// export async function GET() {
//   const session = await auth()

//   if (!session?.user) {
//     return NextResponse.json({ message: "Unauthenticated" }, { status: 401 })
//   }

//   const token = session.user.accessToken

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     cache: "no-store"
//   })

//   const data = await res.json()

//   return NextResponse.json(data)
// }