"use client"
import { Vaccine } from "../types/Vaccine"
import { useState } from "react"

export default function useVaccineSchedule() {
  
  const [vaccines, setVaccines] = useState<Vaccine[]>([
    {
      id: '1',
      pet: 'Buddy',
      name: 'Leptospirosis',
      date: new Date(2025, 11, 17),
      reminder: true,
      completed: false
    },
    {
      id: '2',
      pet: 'Buddy',
      name: 'Rabies',
      date: new Date(2025, 11, 16),
      reminder: true,
      completed: false
    },
    {
      id: '3',
      pet: 'Whiskers',
      name: 'FVRCP',
      date: new Date(2025, 11, 21),
      reminder: false,
      completed: false
    },
    {
      id: '4',
      pet: 'Buddy',
      name: 'Leptospirosis',
      date: new Date(2025, 10, 8),
      reminder: true,
      completed: true
    }
  ])

  const addVaccine = (vaccine: Omit<Vaccine, 'id'>) => {
    const newVaccine = {
      ...vaccine,
      id: Date.now().toString()
    }
    setVaccines([...vaccines, newVaccine])
  }

  const deleteVaccine = (id: string) => {
    setVaccines(vaccines.filter(v => v.id !== id))
  }

  const toggleComplete = (id: string) => {
    setVaccines(vaccines.map(v => 
      v.id === id ? { ...v, completed: !v.completed } : v
    ))
  }

  const editVaccine = (id: string) => {
    // Edit functionality can be implemented
    console.log('Edit vaccine:', id)
  }

  const upcomingVaccines = vaccines.filter(v => !v.completed)
  const completedVaccines = vaccines.filter(v => v.completed)


      return {
    vaccines,
    addVaccine,
    deleteVaccine,
    toggleComplete,
     editVaccine,
    upcomingVaccines,
    completedVaccines
  };

}