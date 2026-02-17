// data/api/vets.ts

// import { Vet } from '../../types/Vet'

// // Import your existing vets data
// // Adjust the path based on your project structure
// // import { vets as initialVets } from '../vets'

// // localStorage key for storing vets
// const STORAGE_KEY = 'vet_clinic_doctors'

// // Sample initial vets data (matches your structure)
// const INITIAL_VETS: Vet[] = [
//   {
//     id: '1',
//     name: 'Dr. Rawda Mamdouh',
//     specialty: 'Orthopedic & Soft Tissue Surgery',
//     rating: 4.9,
//     reviews: 127,
//     image: '/vet-woman3.jpg',
//     location: 'Port Said',
//     phone: '+20 101 234 5678',
//     email: 'rawda.mamdouh@example.com',
//     bio: 'Highly experienced surgeon specializing in complex orthopedic and soft tissue surgeries. Renowned for compassionate care and dedication to animal well-being.',
//     experience: 15,
//     published: true
//   },
//   {
//     id: '2',
//     name: 'Dr. Ahmed Hassan',
//     specialty: 'Internal Medicine',
//     rating: 4.8,
//     reviews: 98,
//     image: '/vet-man2.jpg',
//     location: 'Ismailia',
//     phone: '+20 102 345 6789',
//     email: 'ahmed.hassan@example.com',
//     bio: 'Specialist in internal medicine with expertise in diagnosing and treating complex medical conditions in pets.',
//     experience: 12,
//     published: true
//   },
//   {
//     id: '3',
//     name: 'Dr. Sarah Mitchell',
//     specialty: 'Emergency & Critical Care',
//     rating: 4.9,
//     reviews: 156,
//     image: '/vet-woamn.jpg',
//     location: 'Port Said',
//     phone: '+20 103 456 7890',
//     email: 'sarah.mitchell@example.com',
//     bio: 'Expert in emergency and critical care, providing life-saving treatment for pets in urgent situations.',
//     experience: 10,
//     published: true
//   }
// ]

// // ==========================================
// // STORAGE HELPER FUNCTIONS
// // ==========================================
// const getStoredVets = (): Vet[] => {
//   if (typeof window === 'undefined') return INITIAL_VETS
  
//   const stored = localStorage.getItem(STORAGE_KEY)
//   if (!stored) {
//     // Initialize with sample vets
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_VETS))
//     return INITIAL_VETS
//   }
//   return JSON.parse(stored)
// }

// const saveVets = (vets: Vet[]): void => {
//   if (typeof window === 'undefined') return
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(vets))
//   // Trigger event for real-time updates
//   window.dispatchEvent(new CustomEvent('vetsUpdated'))
// }

// // ==========================================
// // API FUNCTIONS
// // ==========================================
// const getAllVets = async (): Promise<Vet[]> => {
//   await new Promise(resolve => setTimeout(resolve, 300))
//   return getStoredVets()
// }

// const getVetById = async (id: string): Promise<Vet | null> => {
//   await new Promise(resolve => setTimeout(resolve, 200))
//   const vets = getStoredVets()
//   return vets.find(vet => vet.id === id) || null
// }

// const getVetsBySpecialty = async (specialty: string): Promise<Vet[]> => {
//   await new Promise(resolve => setTimeout(resolve, 300))
//   const vets = getStoredVets()
//   return vets.filter(vet => vet.specialty === specialty)
// }

// const getVetsByLocation = async (location: string): Promise<Vet[]> => {
//   await new Promise(resolve => setTimeout(resolve, 300))
//   const vets = getStoredVets()
//   return vets.filter(vet => vet.location === location)
// }

// const createVet = async (vet: Omit<Vet, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vet> => {
//   await new Promise(resolve => setTimeout(resolve, 300))
  
//   const vets = getStoredVets()
//   const newVet: Vet = {
//     ...vet,
//     id: Date.now().toString(),
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString()
//   }
  
//   const updatedVets = [newVet, ...vets]
//   saveVets(updatedVets)
  
//   return newVet
// }

// const updateVet = async (id: string, updates: Partial<Vet>): Promise<Vet | null> => {
//   await new Promise(resolve => setTimeout(resolve, 300))
  
//   const vets = getStoredVets()
//   const index = vets.findIndex(vet => vet.id === id)
  
//   if (index === -1) return null
  
//   const updatedVet: Vet = {
//     ...vets[index],
//     ...updates,
//     id: vets[index].id,
//     updatedAt: new Date().toISOString()
//   }
  
//   vets[index] = updatedVet
//   saveVets(vets)
  
//   return updatedVet
// }

// const deleteVet = async (id: string): Promise<boolean> => {
//   await new Promise(resolve => setTimeout(resolve, 300))
  
//   const vets = getStoredVets()
//   const filteredVets = vets.filter(vet => vet.id !== id)
  
//   if (filteredVets.length === vets.length) return false
  
//   saveVets(filteredVets)
//   return true
// }

// const togglePublish = async (id: string): Promise<Vet | null> => {
//   const vets = getStoredVets()
//   const vet = vets.find(v => v.id === id)
  
//   if (!vet) return null
  
//   return updateVet(id, { published: !vet.published })
// }

// // ==========================================
// // EXPORTED API
// // ==========================================
// export const vetsApi = {
//   getAll: getAllVets,
//   getById: getVetById,
//   getBySpecialty: getVetsBySpecialty,
//   getByLocation: getVetsByLocation,
//   create: createVet,
//   update: updateVet,
//   delete: deleteVet,
//   togglePublish: togglePublish,
// }


// data/api/vet.ts

import { Vet } from '../../types/Vet'

const STORAGE_KEY = 'vet_clinic_doctors'

const INITIAL_VETS: Vet[] = [
  {
    id: '1',
    name: 'Dr. Rawda Mamdouh',
    specialty: 'Orthopedic & Soft Tissue Surgery',
    rating: 4.9,
    reviews: 127,
    image: '/vet-woman3.jpg',
    location: 'Port Said',
    phone: '+20 101 234 5678',
    email: 'rawda.mamdouh@example.com',
    bio: 'Highly experienced surgeon specializing in complex orthopedic and soft tissue surgeries. Renowned for compassionate care and dedication to animal well-being.',
    experience: 15,
    published: true
  },
  {
    id: '2',
    name: 'Dr. Ahmed Hassan',
    specialty: 'Internal Medicine',
    rating: 4.8,
    reviews: 98,
    image: '/vet-man2.jpg',
    location: 'Ismailia',
    phone: '+20 102 345 6789',
    email: 'ahmed.hassan@example.com',
    bio: 'Specialist in internal medicine with expertise in diagnosing and treating complex medical conditions in pets.',
    experience: 12,
    published: true
  },
  {
    id: '3',
    name: 'Dr. Sarah Mitchell',
    specialty: 'Emergency & Critical Care',
    rating: 4.9,
    reviews: 156,
    image: '/vet-woamn.jpg',
    location: 'Port Said',
    phone: '+20 103 456 7890',
    email: 'sarah.mitchell@example.com',
    bio: 'Expert in emergency and critical care, providing life-saving treatment for pets in urgent situations.',
    experience: 10,
    published: true
  }
]

// ==========================================
// STORAGE HELPERS - محمية من أي crash
// ==========================================
const getStoredVets = (): Vet[] => {
  if (typeof window === 'undefined') return INITIAL_VETS

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_VETS))
      return INITIAL_VETS
    }

    const parsed = JSON.parse(stored)

    // ✅ تأكد إن الداتا array وكل عنصر فيها عنده id
    if (!Array.isArray(parsed)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_VETS))
      return INITIAL_VETS
    }

    // ✅ أي vet مش عنده id، حطله واحد تلقائياً
    const fixed = parsed.map((v: Vet, i: number) => ({
      ...v,
      id: v.id ? String(v.id) : String(Date.now() + i)
    }))

    return fixed
  } catch {
    // لو الداتا corrupt، ارجع للـ initial
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_VETS))
    return INITIAL_VETS
  }
}

// ✅ debounce عشان الـ event ما يتبعتش أكتر من مرة
let dispatchTimer: ReturnType<typeof setTimeout> | null = null

const saveVets = (vets: Vet[]): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vets))

    if (dispatchTimer) clearTimeout(dispatchTimer)
    dispatchTimer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('vetsUpdated'))
      dispatchTimer = null
    }, 100)
  } catch {
    console.error('Failed to save vets to localStorage')
  }
}

// ==========================================
// API FUNCTIONS
// ==========================================
const getAllVets = async (): Promise<Vet[]> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return getStoredVets()
}

const getVetById = async (id: string): Promise<Vet | null> => {
  await new Promise(resolve => setTimeout(resolve, 200))
  const vets = getStoredVets()
  return vets.find(vet => String(vet.id) === String(id)) || null
}

const getVetsBySpecialty = async (specialty: string): Promise<Vet[]> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const vets = getStoredVets()
  return vets.filter(vet => vet.specialty === specialty)
}

const getVetsByLocation = async (location: string): Promise<Vet[]> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const vets = getStoredVets()
  return vets.filter(vet => vet.location === location)
}

const createVet = async (vet: Omit<Vet, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vet> => {
  await new Promise(resolve => setTimeout(resolve, 300))

  const vets = getStoredVets()
  const newVet: Vet = {
    ...vet,
    id: Date.now().toString(),       // ✅ id مضمون دايماً
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  saveVets([newVet, ...vets])
  return newVet
}

const updateVet = async (id: string, updates: Partial<Vet>): Promise<Vet | null> => {
  await new Promise(resolve => setTimeout(resolve, 300))

  const vets = getStoredVets()
  const index = vets.findIndex(vet => String(vet.id) === String(id))

  if (index === -1) return null

  const updatedVet: Vet = {
    ...vets[index],
    ...updates,
    id: vets[index].id,             // ✅ id ما بيتغيرش أبداً
    updatedAt: new Date().toISOString()
  }

  vets[index] = updatedVet
  saveVets(vets)
  return updatedVet
}

const deleteVet = async (id: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 300))

  const vets = getStoredVets()
  const filtered = vets.filter(vet => String(vet.id) !== String(id))

  if (filtered.length === vets.length) return false

  saveVets(filtered)
  return true
}

const togglePublish = async (id: string): Promise<Vet | null> => {
  const vets = getStoredVets()
  const vet = vets.find(v => String(v.id) === String(id))
  if (!vet) return null
  return updateVet(id, { published: !vet.published })
}

// ✅ امسح الداتا القديمة وارجع للـ initial (للاستخدام في الـ console لو في مشكلة)
const resetVets = (): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_VETS))
  window.dispatchEvent(new CustomEvent('vetsUpdated'))
}

// ==========================================
// EXPORTED API
// ==========================================
export const vetsApi = {
  getAll: getAllVets,
  getById: getVetById,
  getBySpecialty: getVetsBySpecialty,
  getByLocation: getVetsByLocation,
  create: createVet,
  update: updateVet,
  delete: deleteVet,
  togglePublish,
  reset: resetVets     // ✅ للطوارئ: vetsApi.reset() في الـ console
}