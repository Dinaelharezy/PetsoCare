
import { Report } from '../../types/report'
// const BASE_URL = process.env.

export async function getAllReports() {
  const res = await fetch(`api/admin/reports`);
  return res.json();
}

export async function manageReport(id: number, data: any) {
  const res = await fetch(`api/admin/reports/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function getMyReports(token: string) {
  const res = await fetch(`api/report/my-reports`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

export async function getMapReports() {
  const res = await fetch(`api/admin/reports/map`);
  return res.json();
}