'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'

interface PetData {
  name: string
  licenseNumber: string
  weight: string
  age: string
  breed: string
  species: string
  diseases: string
  image: File | null
}

interface Vaccine {
  id: number
  name: string
  date: string
  alarm: boolean
}

export default function RegisterPet() {
  const [petData, setPetData] = useState<PetData>({
    name: '',
    licenseNumber: '',
    weight: '',
    age: '',
    breed: '',
    species: '',
    diseases: '',
    image: null
  })

  const [vaccines, setVaccines] = useState<Vaccine[]>([
    { id: 1, name: 'Rabies', date: '', alarm: true },
    { id: 2, name: 'Distemper', date: '', alarm: false }
  ])

  const [previewImage, setPreviewImage] = useState<string>('/dog.png')

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPetData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
        setPetData(prev => ({ ...prev, image: file }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVaccineChange = (id: number, field: keyof Vaccine, value: string | boolean) => {
    setVaccines(prev => prev.map(vaccine => 
      vaccine.id === id ? { ...vaccine, [field]: value } : vaccine
    ))
  }

  const addVaccine = () => {
    const newId = vaccines.length > 0 ? Math.max(...vaccines.map(v => v.id)) + 1 : 1
    setVaccines(prev => [...prev, { id: newId, name: '', date: '', alarm: false }])
  }

  const removeVaccine = (id: number) => {
    setVaccines(prev => prev.filter(vaccine => vaccine.id !== id))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Pet Data:', petData)
    console.log('Vaccines:', vaccines)
    alert('Pet registered successfully!')
  }

  return (
    <div className="container py-5">
      <div className="mx-auto" style={{ maxWidth: '600px' }}>
        {/* Header */}
        <h2 className="text-center mb-5 fw-bold">Register Your Beloved Pet</h2>

        <form onSubmit={handleSubmit}>
          {/* Pet Details Section */}
          <div className="mb-5">
            <h5 className="mb-4">Pet Details</h5>

            {/* Pet Name & License Number */}
            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <label className="form-label">Pet Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="name"
                  value={petData.name}
                  onChange={handleChange}
                  placeholder="Enter pet's name"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">License Number</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="licenseNumber"
                  value={petData.licenseNumber}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>
            </div>

            {/* Weight & Age */}
            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <label className="form-label">Weight (kg)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="weight"
                  value={petData.weight}
                  onChange={handleChange}
                  placeholder="e.g., 5"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Age (years)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="age"
                  value={petData.age}
                  onChange={handleChange}
                  placeholder="e.g., 2"
                />
              </div>
            </div>

            {/* Breed & Species */}
            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <label className="form-label">Breed</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="breed"
                  value={petData.breed}
                  onChange={handleChange}
                  placeholder="e.g., Golden Retriever"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Species</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="species"
                  value={petData.species}
                  onChange={handleChange}
                  placeholder="e.g., Dog"
                />
              </div>
            </div>

            {/* Known Diseases */}
            <div className="mb-3">
              <label className="form-label">Known Diseases / Medical Conditions (Optional)</label>
              <textarea 
                className="form-control" 
                rows={3}
                name="diseases"
                value={petData.diseases}
                onChange={handleChange}
                placeholder='List any known health issues or conditions, e.g., "Arthritis, Allergies"'
              />
            </div>

            {/* Pet Image */}
            <div className="mb-3">
              <label className="form-label">Pet Image</label>
              <div className="d-flex align-items-center gap-3">
                <div 
                  className="border rounded p-2 d-flex align-items-center justify-content-center"
                  style={{ width: '100px', height: '100px', backgroundColor: '#f8f9fa' }}
                >
                  <Image 
                    src={previewImage} 
                    alt="Pet preview" 
                    width={80} 
                    height={80}
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
                <input 
                  type="file" 
                  className="form-control" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ maxWidth: '350px' }}
                />
              </div>
            </div>
          </div>

          {/* Vaccine Schedule Section */}
          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0">Vaccine Schedule</h5>
              <button 
                type="button" 
                className="btn btn-outline-secondary btn-sm"
                onClick={addVaccine}
              >
                + Add Vaccine
              </button>
            </div>

            {vaccines.map((vaccine) => (
              <div key={vaccine.id} className="row align-items-center mb-3 pb-3 border-bottom">
                <div className="col-md-3 mb-2 mb-md-0">
                  <input 
                    type="text" 
                    className="form-control" 
                    value={vaccine.name}
                    onChange={(e) => handleVaccineChange(vaccine.id, 'name', e.target.value)}
                    placeholder="Vaccine name"
                  />
                </div>
                <div className="col-md-4 mb-2 mb-md-0">
                  <input 
                    type="date" 
                    className="form-control" 
                    value={vaccine.date}
                    onChange={(e) => handleVaccineChange(vaccine.id, 'date', e.target.value)}
                  />
                </div>
                <div className="col-md-3 mb-2 mb-md-0">
                  <div className="form-check form-switch d-flex align-items-center gap-2">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={vaccine.alarm}
                      onChange={(e) => handleVaccineChange(vaccine.id, 'alarm', e.target.checked)}
                      style={{ width: '3em', height: '1.5em' }}
                    />
                    <label className="form-check-label small">Set Alarm</label>
                  </div>
                </div>
                <div className="col-md-2 text-end">
                  <button 
                    type="button" 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeVaccine(vaccine.id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn w-100 py-3 fw-semibold"
            style={{ 
              backgroundColor: 'rgb(199, 242, 167)', 
              border: 'none',
              fontSize: '16px'
            }}
          >
            Register Pet
          </button>
        </form>
      </div>
    </div>
  )
}