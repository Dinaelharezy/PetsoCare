// store/sheltersStore.ts
import { create } from 'zustand'
import { Shelter } from '@/types/Shelter'

interface SheltersStore {
  shelters: Shelter[]
  lastFetched: number | null
  setShelters: (shelters: Shelter[]) => void
  clearShelters: () => void
}

const CACHE_DURATION = 5 * 60 * 1000  // 5 دقايق

export const useSheltersStore = create<SheltersStore>((set) => ({
  shelters: [],
  lastFetched: null,
  setShelters: (shelters) =>
    set({ shelters, lastFetched: Date.now() }),
  clearShelters: () =>
    set({ shelters: [], lastFetched: null }),
}))

export { CACHE_DURATION }