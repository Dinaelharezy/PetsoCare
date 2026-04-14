"use client";

import { useEffect, useState } from "react";
import { getMyReports } from "../../../data/api/report";

export default function MyReports() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    load(token);
  }, []);

  const load = async (token: string) => {
    const data = await getMyReports(token);
    setReports(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>My Reports</h1>

      {reports.map((r) => (
        <div key={r.id} style={{ border: "1px solid", margin: 10 }}>
          <p>ID: {r.id}</p>
          <p>Status: {r.status}</p>
          <p>Type: {r.type}</p>
          <p>Admin Response: {r.adminResponse}</p>
        </div>
      ))}
    </div>
  );
}