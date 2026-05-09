
'use client'

import { useState } from 'react'

const DOG_SYMPTOMS = [
  'Sudden aggression or unusual aggressive behavior',
  'Repeated attempts to bite',
  'Eating strange objects',
  'Random running, noticeable nervous or behavioral disturbance',
  'Voice change',
  'Excessive drooling',
  'Partial or complete paralysis',
  'Sudden behavioral change (isolation or extreme agitation)',
  'Difficulty swallowing',
]

const CAT_SYMPTOMS = [
  'Sudden change in behavior (fear, extreme calmness, or unusual aggression)',
  'Severe isolation or constant hiding',
  'Loss of appetite',
  'Unusual meowing or noticeable change in voice',
  'Dilated pupils',
  'Repeated biting or scratching attempts without reason',
  'Random running or abnormal tension and movement',
  'Extreme sensitivity to sound and light',
  'Drooling or foam around the mouth',
  'Difficulty swallowing and refusal to drink water or eat',
  'Loss of balance or staggering',
  'Partial paralysis, usually starting in the hind legs',
  'Complete paralysis or inability to move',
]

const INITIAL_FORM = {
  name: '',
  phone: '',
  governorate: '',
  district: '',
  animalType: 'Dog',
  reportDate: '',
  locationCity: '',
  lat: '',
  lng: '',
  otherSymptom: '',
}

export function useDangerousAnimal() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [locationMode, setLocationMode] = useState<'gps' | 'manual'>('manual')
  const [showMapModal, setShowMapModal] = useState(false) // ✅
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submittedData, setSubmittedData] = useState<Record<string, unknown> | null>(null)
const [showRating, setShowRating] = useState(false)
  const symptoms = formData.animalType === 'Dog' ? DOG_SYMPTOMS : CAT_SYMPTOMS
  const highSuspicion = selectedSymptoms.length > 1

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    )
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (name === 'animalType') setSelectedSymptoms([])
  }

  // ✅ يفتح المودال
  const handleDetectLocation = () => {
    setLocationMode('gps')
    setShowMapModal(true)
  }

  // ✅ يحفظ الموقع المختار
  const handleLocationSelected = (lat: number, lng: number, address?: string) => {
    setFormData(prev => ({
      ...prev,
      lat: String(lat),
      lng: String(lng),
      locationCity: address ?? prev.locationCity,
    }))
    setShowMapModal(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)


    const payload = {
  name:             formData.name,
  phone:            formData.phone,
  governorate:      formData.governorate,
  district:         formData.district,
  animalType:       formData.animalType,
  reportDate:       formData.reportDate,
  locationCity:     formData.locationCity,
  latitude:         formData.lat  ? parseFloat(formData.lat)  : null,
  longitude:        formData.lng  ? parseFloat(formData.lng)  : null,
  SelectedSymptoms: [
    ...selectedSymptoms,
    ...(formData.otherSymptom ? [formData.otherSymptom] : []),
  ],
  highSuspicion,
  locationMode,
}

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/report/dangerous`, {
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
    setShowRating(true)  
      setTimeout(() => {
        setSubmitted(false)
        setSubmittedData(null)
        setFormData(INITIAL_FORM)
        setSelectedSymptoms([])
        setLocationMode('manual')
      }, 5000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    formData,
    setFormData,
    selectedSymptoms,
    setSelectedSymptoms,
    locationMode,
    setLocationMode,
    showMapModal,           
    setShowMapModal,        
    handleDetectLocation,   
    handleLocationSelected, 
    submitted,
    submittedData,
    isLoading,
    error,
    symptoms,
    highSuspicion,
    toggleSymptom,
    handleChange,
    handleSubmit,
    showRating, setShowRating
  }
}