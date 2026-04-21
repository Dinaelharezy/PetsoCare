export type ReportStatus =
  | "Pending"
  | "Seen"
  | "Approved"
  | "InProgress"
  | "Done"
  | "Rejected";

export type ReportType =
  | "Bite"
  | "DangerousAnimal"
  | "Complaint";

export interface Report {
  id: number;
  type: ReportType;
  status: ReportStatus;
  name: string;
  phone: string;
  governorate: string;
  district: string;
  adminResponse?: string;
  details: any;
    latitude?: number;   // ← زود دول
  longitude?: number;
}