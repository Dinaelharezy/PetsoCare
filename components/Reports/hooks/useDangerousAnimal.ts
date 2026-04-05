
'use client'

import { useState } from 'react'

export function useDangerousAnimal() {
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

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    governorate: '',
    district: '',
    animalType: 'Dog',
    reportDate: '',
    locationCity: '',
    otherSymptom: '',
  })

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [locationMode, setLocationMode] = useState<'gps' | 'manual'>('manual')
  const [submitted, setSubmitted] = useState(false)

  const symptoms =
    formData.animalType === 'Dog' ? DOG_SYMPTOMS : CAT_SYMPTOMS

  const highSuspicion = selectedSymptoms.length > 1

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (name === 'animalType') {
      setSelectedSymptoms([])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    alert('Report submitted successfully!')
  }

  return {
    formData,
    setFormData,
    selectedSymptoms,
    setSelectedSymptoms,
    locationMode,
    setLocationMode,
    submitted,
    symptoms,
    highSuspicion,
    toggleSymptom,
    handleChange,
    handleSubmit,
  }
}