
import { Report,BiteReport,ComplaintReport,DangerousAnimalReport } from '../../types/report'


export async function getAllReports() {
  const res = await fetch(`/api/admin/reports`);
  return res.json();
}

export async function manageReport(id: number, data: any) {
  const res = await fetch(`/api/admin/reports/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function getMyReports(token: string) {
  const res = await fetch(`/api/report/my-reports`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

// export async function getMapReports() {
//   const res = await fetch(`/api/admin/reports/map`);
//   return res.json();
// }
// export async function getMapReports(token: string) {
//   const res = await fetch(`/api/admin/reports/map`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return res.json();
// }
export async function getMapReports(token?: string) {
  const res = await fetch(`/api/admin/reports/map`, {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });

  // 👇 check الأول
  if (!res.ok) {
    const text = await res.text()
    console.error('API Error:', res.status, text)
    throw new Error('Failed to fetch reports')
  }

  // 👇 مهم: لو فاضي
  const text = await res.text()

  if (!text) {
    console.warn('Empty response from API')
    return []
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    console.error('Invalid JSON:', text)
    return []
  }
}