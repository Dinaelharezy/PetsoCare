

export enum LocationType {
  Area     = 1,
  Location = 2,
}

export enum ServiceType {
  None   = 0,
  Human  = 1,
  Animal = 2,
}

// ─── Labels ───────────────────────────────────────────────────────────────────

export const LOCATION_TYPE_LABELS: Record<string, string> = {
  'Area':     'Area',
  'Location': 'Location',
  '1':        'Area',
  '2':        'Location',
}

export const SERVICE_TYPE_LABELS: Record<number, string> = {
  0: '—',
  1: 'Human Rabies Prevention',
  2: 'Animal Rabies Prevention',
}

// ─── VaccLocation (matches actual backend JSON) ───────────────────────────────

export interface VaccLocation {
  id:               number
  name:             string
  type:             string    // backend returns "Area" | "Location"
  governorate:      string
  address:          string
  phone:            string
  serviceType:      number    // 0 | 1 | 2
  status:           string    // "true" | "false"
  providesVaccine?: boolean
}

// ─── Form shape ───────────────────────────────────────────────────────────────

export interface VaccLocationForm {
  name:            string
  type:            string    // "1" | "2"
  governorate:     string
  address:         string
  phone:           string
  serviceType:     string    // "0" | "1" | "2"
  providesVaccine: boolean
  isActive:        boolean
}

export const emptyVaccLocationForm: VaccLocationForm = {
  name:            '',
  type:            '',
  governorate:     '',
  address:         '',
  phone:           '',
  serviceType:     '',
  providesVaccine: true,
  isActive:        true,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function typeColor(type?: string | number): string {
  const map: Record<string, string> = {
    'Area':     '#f0653f',
    'Location': '#10b981',
    '1':        '#f0653f',
    '2':        '#10b981',
  }
  return type != null ? (map[String(type)] ?? '#6b7280') : '#6b7280'
}

export function isLocationActive(loc: VaccLocation): boolean {
  return loc.status === 'true'
}

// ─── Form → API payload ───────────────────────────────────────────────────────

export function formToPayload(form: VaccLocationForm): Record<string, unknown> {
  return {
    name:            form.name,
    governorate:     form.governorate,
    address:         form.address,
    phone:           form.phone || '',
    type:            Number(form.type),
    serviceType:     Number(form.serviceType),
    providesVaccine: form.providesVaccine,
  }
}