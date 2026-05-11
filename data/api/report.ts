
// import { Report,BiteReport,ComplaintReport,DangerousAnimalReport } from '../../types/report'


// export async function getAllReports() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/reports`);
//   return res.json();
// }
// export async function getAllApprovedReports() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/report/approved_inprogress_done`);
//   return res.json();
// }

// export async function manageReport(id: number, data: any) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/reports/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   return res.json();
// }

// export async function getMyReports(token: string) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/report/my-reports`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return res.json();
// }

// // export async function getMapReports() {
// //   const res = await fetch(`/api/admin/reports/map`);
// //   return res.json();
// // }
// // export async function getMapReports(token: string) {
// //   const res = await fetch(`/api/admin/reports/map`, {
// //     headers: {
// //       Authorization: `Bearer ${token}`,
// //     },
// //   });

// //   return res.json();
// // }
// export async function getMapReports(token?: string) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/reports/map`, {
//     headers: token
//       ? { Authorization: `Bearer ${token}` }
//       : {},
//   });

//   // 👇 check الأول
//   if (!res.ok) {
//     const text = await res.text()
//     console.error('API Error:', res.status, text)
//     throw new Error('Failed to fetch reports')
//   }

//   // 👇 مهم: لو فاضي
//   const text = await res.text()

//   if (!text) {
//     console.warn('Empty response from API')
//     return []
//   }

//   try {
//     return JSON.parse(text)
//   } catch (e) {
//     console.error('Invalid JSON:', text)
//     return []
//   }
// }

import { Report, BiteReport, ComplaintReport, DangerousAnimalReport } from '../../types/report'
import { apiUrl } from '@/lib/api'
// Helper function للتعامل مع الاستجابات (اختياري ولكن مفيد)
async function handleResponse(res: Response) {
  const text = await res.text()
  if (!res.ok) {
    try {
      const error = JSON.parse(text)
      throw new Error(error.error || error.message || 'Request failed')
    } catch {
      throw new Error(text || 'Request failed')
    }
  }
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

// ✅ تم التعديل - استخدام Proxy
export async function getAllReports() {
  const res = await fetch(apiUrl('admin/reports'))
  return handleResponse(res)
}

// ✅ تم التعديل - استخدام Proxy
export async function getAllApprovedReports() {
  const res = await fetch(apiUrl('report/approved_inprogress_done'))
  return handleResponse(res)
}

// ✅ تم التعديل - استخدام Proxy (تم إزالة الـ headers لأن الـ Proxy سيتولى التوكن)
export async function manageReport(id: number, data: any) {
  const res = await fetch(apiUrl(`admin/reports/${id}`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

// ✅ تم التعديل - استخدام Proxy (تم إزالة التوكن من المعاملات)
export async function getMyReports(token?: string) { // token أصبح غير مطلوب ولكن يمكن تركه للتوافق مع الكود القديم
  const res = await fetch(apiUrl('report/my-reports'))
  return handleResponse(res)
}

// ✅ تم التعديل - استخدام Proxy (تم إزالة التوكن وتبسيط المنطق)
export async function getMapReports(token?: string) {
  try {
    const res = await fetch(apiUrl('admin/reports/map'))
    
    if (!res.ok) {
      const errorText = await res.text()
      console.error('API Error:', res.status, errorText)
      return [] // إرجاع مصفوفة فارغة في حالة الخطأ
    }

    const text = await res.text()
    if (!text) {
      return []
    }

    return JSON.parse(text)
  } catch (e) {
    console.error('Failed to fetch map reports:', e)
    return []
  }
}