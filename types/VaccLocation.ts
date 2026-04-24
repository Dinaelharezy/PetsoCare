

// ─── Enums matching backend integers ─────────────────────────────────────────

export enum LocationType {
  Hospital = 1,
  Pharmacy = 2,
  Lab      = 3,
  Clinic   = 4,
  Center   = 5,
}

export enum ServiceType {
  StrayAnimalCampaign = 3,
  AnimalRabiesVaccine = 2,
  HumanPEP            = 1,
  InquiryOnly         = 4,
}

// ─── Human-readable labels ────────────────────────────────────────────────────

export const LOCATION_TYPE_LABELS: Record<LocationType, string> = {
  [LocationType.Hospital]: 'Hospital',
  [LocationType.Pharmacy]: 'Pharmacy',
  [LocationType.Lab]:      'Lab',
  [LocationType.Clinic]:   'Clinic',
  [LocationType.Center]:   'Center',
}

export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  [ServiceType.StrayAnimalCampaign]: 'Stray Animal Rabies Vaccination Campaigns',
  [ServiceType.AnimalRabiesVaccine]: 'Animal Rabies Vaccination',
  [ServiceType.HumanPEP]:            'Emergency – Human Rabies Vaccine (PEP)',
  [ServiceType.InquiryOnly]:         'Inquiries & Referrals Only',
}

// ─── VaccLocation (matches backend JSON) ──────────────────────────────────────

export interface VaccLocation {
  id:              number
  name:            string
  type:            LocationType          // integer 1-5
  governorate:     string
  address:         string
  phone:           string | null
  hours?:          string | null
  note?:           string | null
  providesVaccine: boolean
  serviceType:     ServiceType           // integer 1-4
  isActive:        boolean
}

// ─── Form shape (strings before conversion) ───────────────────────────────────

export interface VaccLocationForm {
  name:            string
  type:            string                // will be cast to LocationType int
  governorate:     string
  address:         string
  phone:           string
  hours:           string
  note:            string
  providesVaccine: boolean
  serviceType:     string               // will be cast to ServiceType int
  isActive:        boolean
}

export const emptyVaccLocationForm: VaccLocationForm = {
  name:            '',
  type:            '',
  governorate:     '',
  address:         '',
  phone:           '',
  hours:           '',
  note:            '',
  providesVaccine: true,
  serviceType:     '',
  isActive:        true,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formToPayload(f: VaccLocationForm): Omit<VaccLocation, 'id'> {
  return {
    name:            f.name,
    type:            Number(f.type) as LocationType,
    governorate:     f.governorate,
    address:         f.address,
    phone:           f.phone || null,
    hours:           f.hours || null,
    note:            f.note  || null,
    providesVaccine: f.providesVaccine,
    serviceType:     Number(f.serviceType) as ServiceType,
    isActive:        f.isActive,
  }
}

/** Colour strip per location type */
export function typeColor(type?: LocationType | number): string {
  const map: Record<number, string> = {
    [LocationType.Hospital]: '#ef4444',
    [LocationType.Pharmacy]: '#22c55e',
    [LocationType.Lab]:      '#3b82f6',
    [LocationType.Clinic]:   '#f97316',
    [LocationType.Center]:   '#a855f7',
  }
  return type != null ? (map[type] ?? '#6b7280') : '#6b7280'
}