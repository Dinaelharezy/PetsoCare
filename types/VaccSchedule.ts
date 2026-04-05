export interface VaccSchedule {
  id: string
  title: string
  subtitle?: string
  type: 'human' | 'animal'
  doses: DoseDay[]
  notes?: string[]
}

export interface DoseDay {
  day: number | string
  label: string
  note?: string
}