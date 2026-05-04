// store/appStore.ts — store واحد بيجمع كل الـ cache في التطبيق

import { create } from 'zustand'
import { Clinic } from '@/types/Clinic'
import { Shelter } from '@/types/Shelter'

const CACHE_DURATION = 5 * 60 * 1000  

interface CacheEntry<T> {
  data: T
  fetchedAt: number
}

interface AppStore {
  // ─── Clinics List ───────────────────────────────────────
  clinics: Clinic[]
  clinicCategories: string[]
  clinicsLastFetched: number | null
  setClinics: (clinics: Clinic[], categories: string[]) => void

  // ─── Shelters List ──────────────────────────────────────
  shelters: Shelter[]
  sheltersLastFetched: number | null
  setShelters: (shelters: Shelter[]) => void

  // ─── Individual Clinic Profiles (by id) ─────────────────
  clinicProfiles: Record<string, CacheEntry<Clinic>>
  getClinicProfile: (id: string) => Clinic | null
  setClinicProfile: (id: string, data: Clinic) => void

  // ─── Individual Shelter Profiles (by id) ────────────────
  shelterProfiles: Record<string, CacheEntry<Shelter>>
  getShelterProfile: (id: string) => Shelter | null
  setShelterProfile: (id: string, data: Shelter) => void

  // ─── Helpers ────────────────────────────────────────────
  isClinicsStale: () => boolean
  isSheltersStale: () => boolean
}

export const useAppStore = create<AppStore>((set, get) => ({
  // ─── Clinics List ───────────────────────────────────────
  clinics: [],
  clinicCategories: ['Overview'],
  clinicsLastFetched: null,
  setClinics: (clinics, categories) =>
    set({ clinics, clinicCategories: categories, clinicsLastFetched: Date.now() }),

  // ─── Shelters List ──────────────────────────────────────
  shelters: [],
  sheltersLastFetched: null,
  setShelters: (shelters) =>
    set({ shelters, sheltersLastFetched: Date.now() }),

  // ─── Individual Clinic Profiles ─────────────────────────
  clinicProfiles: {},
  getClinicProfile: (id) => {
    const entry = get().clinicProfiles[id]
    if (!entry) return null
    if (Date.now() - entry.fetchedAt > CACHE_DURATION) return null
    return entry.data
  },
  setClinicProfile: (id, data) =>
    set(state => ({
      clinicProfiles: {
        ...state.clinicProfiles,
        [id]: { data, fetchedAt: Date.now() },
      },
    })),

  // ─── Individual Shelter Profiles ────────────────────────
  shelterProfiles: {},
  getShelterProfile: (id) => {
    const entry = get().shelterProfiles[id]
    if (!entry) return null
    if (Date.now() - entry.fetchedAt > CACHE_DURATION) return null
    return entry.data
  },
  setShelterProfile: (id, data) =>
    set(state => ({
      shelterProfiles: {
        ...state.shelterProfiles,
        [id]: { data, fetchedAt: Date.now() },
      },
    })),

  // ─── Helpers ────────────────────────────────────────────
  isClinicsStale: () => {
    const { clinicsLastFetched } = get()
    return !clinicsLastFetched || Date.now() - clinicsLastFetched > CACHE_DURATION
  },
  isSheltersStale: () => {
    const { sheltersLastFetched } = get()
    return !sheltersLastFetched || Date.now() - sheltersLastFetched > CACHE_DURATION
  },
}))

export { CACHE_DURATION }