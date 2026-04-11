// import { useState } from 'react'

// export  function useEmergency() {
//     const BODY_LOCATIONS = ['Neck', 'Head', 'Hand', 'Arm', 'Leg', 'More than one location']

//     const INITIAL_ACTIONS = ['Wound washing', 'Vaccination']
//       const [formData, setFormData] = useState({
//         name: '',
//         phone: '',
//         governorate: '',
//         district: '',
//         animalType: 'Dog',
//         exposureType: 'Bite',
//         severity: 'Superficial',
//         exposureDateTime: '',
//         locationCity: '',
//         otherBodyLocation: '',
//         otherAction: '',
//       })
//       const [bodyLocations, setBodyLocations] = useState<string[]>([])
//       const [initialActions, setInitialActions] = useState<string[]>([])
//       const [locationMode, setLocationMode] = useState<'gps' | 'manual'>('manual')
    
//       const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target
//         setFormData(prev => ({ ...prev, [name]: value }))
//       }
    
//       const toggleBodyLocation = (loc: string) => {
//         setBodyLocations(prev =>
//           prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
//         )
//       }
    
//       const toggleAction = (action: string) => {
//         setInitialActions(prev =>
//           prev.includes(action) ? prev.filter(a => a !== action) : [...prev, action]
//         )
//       }
    
//       const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault()
//         alert('Bite/scratch report submitted successfully! Relevant health authorities have been notified.')
//       }

//       return {
// handleSubmit,
// handleChange,
// toggleBodyLocation,
//  toggleAction,
//  formData, setFormData,
//  bodyLocations, setBodyLocations,
//  locationMode, setLocationMode,
//  BODY_LOCATIONS,
//  INITIAL_ACTIONS,
//       }
// }

'use client'

import { useState } from 'react'

export const BODY_LOCATIONS = [
  'Neck',
  'Head',
  'Hand',
  'Arm',
  'Leg',
  'More than one location',
]

export const INITIAL_ACTIONS = ['Wound washing', 'Vaccination']

const INITIAL_FORM = {
  name: '',
  phone: '',
  governorate: '',
  district: '',
  animalType: 'Dog',
  exposureType: 'Bite',
  severity: 'Superficial',
  exposureDateTime: '',
  locationCity: '',
  otherBodyLocation: '',
  otherAction: '',
}

export function useEmergency() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [bodyLocations, setBodyLocations] = useState<string[]>([])
  const [initialActions, setInitialActions] = useState<string[]>([])
  const [locationMode, setLocationMode] = useState<'gps' | 'manual'>('manual')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submittedData, setSubmittedData] = useState<Record<string, unknown> | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const toggleBodyLocation = (loc: string) => {
    setBodyLocations(prev =>
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    )
  }

  const toggleAction = (action: string) => {
    setInitialActions(prev =>
      prev.includes(action) ? prev.filter(a => a !== action) : [...prev, action]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const payload = {
      ...formData,
      bodyLocations: [
        ...bodyLocations,
        ...(formData.otherBodyLocation ? [formData.otherBodyLocation] : []),
      ],
      initialActions: [
        ...initialActions,
        ...(formData.otherAction ? [formData.otherAction] : []),
      ],
      locationMode,
    }

    try {
      const res = await fetch('/api/report/bite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Submission failed')
      }

      const result = await res.json()
      setSubmittedData(result.data ?? payload)
      setSubmitted(true)

      // Reset after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
        setSubmittedData(null)
        setFormData(INITIAL_FORM)
        setBodyLocations([])
        setInitialActions([])
        setLocationMode('manual')
      }, 5000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleSubmit,
    handleChange,
    toggleBodyLocation,
    toggleAction,
    formData,
    setFormData,
    bodyLocations,
    setBodyLocations,
    initialActions,
    locationMode,
    setLocationMode,
    submitted,
    submittedData,
    isLoading,
    error,
    BODY_LOCATIONS,
    INITIAL_ACTIONS,
  }
}