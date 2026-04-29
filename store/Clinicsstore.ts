// store/clinicsStore.ts
import { create } from 'zustand'
import { Clinic } from '@/types/Clinic'

interface ClinicsStore {
  clinics: Clinic[]
  categories: string[]
  lastFetched: number | null        // timestamp عشان نعرف امتى آخر fetch
  setClinics: (clinics: Clinic[], categories: string[]) => void
  clearClinics: () => void
}

const CACHE_DURATION = 5 * 60 * 1000  // 5 دقايق — بعدها يعمل refetch تلقائي

export const useClinicsStore = create<ClinicsStore>((set) => ({
  clinics: [],
  categories: ['Overview'],
  lastFetched: null,
  setClinics: (clinics, categories) =>
    set({ clinics, categories, lastFetched: Date.now() }),
  clearClinics: () =>
    set({ clinics: [], categories: ['Overview'], lastFetched: null }),
}))

export { CACHE_DURATION }