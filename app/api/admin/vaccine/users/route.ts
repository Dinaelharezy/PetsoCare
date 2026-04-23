// app/api/admin/vaccine/users/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const API = process.env.NEXT_PUBLIC_API_URL

  try {
    // جلب بيانات المستخدمين
    const usersRes = await fetch(`${API}/api/admin/vaccine/users`, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    })
    const users = await usersRes.json()

    // جلب الإحصائيات العامة
    const statsRes = await fetch(`${API}/api/admin/vaccine/stats`, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    })
    const stats = await statsRes.json()

    return NextResponse.json({ users, stats })
  } catch (error) {
    console.error('Error fetching admin data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}