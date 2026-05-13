export interface UserVaccineData {
  userId: string
  taken: number
  pending: number
  risk: string | null
  needsRIG: boolean | null
  userName?: string
  victimType: string | null
  animalType: string | null
}

export interface GlobalStats {
  totalUsers: number
  totalDoses: number
  takenDoses: number
  highRisk: number
  humanCases: number
  animalCases: number
  dogCases: number
  vaccineReceived: number
}