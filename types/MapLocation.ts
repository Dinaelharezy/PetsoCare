export type MapLocation = {
  id:      string | number
  name:    string
  address: string
  lat:     number
  lng:     number
  type:    'clinic' | 'report-bite' | 'report-animal'
  extra?:  Record<string, any>
}


export type FilterKey = 'clinic' | 'report-bite' | 'report-animal' | 'my-reports'

export const TYPE_COLORS: Record<FilterKey, string> = {
  clinic:           '#306beb',
  'report-bite':    '#8b5cf6',
  'report-animal':  '#ef4444',
  'my-reports':     '#2fd2d2',
}

export const FILTER_LABELS: Record<FilterKey, string> = {
  clinic:           '🏥 Clinics',
  'report-bite':    '🐕 Exposure',
  'report-animal':  '⚠️ Dangerous Animal',
  'my-reports':     '👤 My Reports',
}