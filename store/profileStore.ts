// store/profileStore.ts
import { create } from 'zustand'

interface ProfileData {
  id: string
  name: string
  email: string
  image?: string
  imageUrl?: string
  role: string
  phone?: string
}

interface ProfileStore {
  profileData: ProfileData | null
  lastFetchedFor: string | null   
  setProfile: (data: ProfileData, userId: string) => void
  clearProfile: () => void
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profileData: null,
  lastFetchedFor: null,
  setProfile: (data, userId) =>
    set({ profileData: data, lastFetchedFor: userId }),
  clearProfile: () =>
    set({ profileData: null, lastFetchedFor: null }),
}))