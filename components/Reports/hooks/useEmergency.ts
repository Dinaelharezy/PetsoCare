import { useState } from 'react'

export  function useEmergency() {
    const BODY_LOCATIONS = ['Neck', 'Head', 'Hand', 'Arm', 'Leg', 'More than one location']

    const INITIAL_ACTIONS = ['Wound washing', 'Vaccination']
      const [formData, setFormData] = useState({
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
      })
      const [bodyLocations, setBodyLocations] = useState<string[]>([])
      const [initialActions, setInitialActions] = useState<string[]>([])
      const [locationMode, setLocationMode] = useState<'gps' | 'manual'>('manual')
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        alert('Bite/scratch report submitted successfully! Relevant health authorities have been notified.')
      }

      return {
handleSubmit,
handleChange,
toggleBodyLocation,
 toggleAction,
 formData, setFormData,
 bodyLocations, setBodyLocations,
 locationMode, setLocationMode,
 BODY_LOCATIONS,
 INITIAL_ACTIONS,
      }
}