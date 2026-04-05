import { useState } from 'react'

export  function useComplainment() {

 const [urgency, setUrgency] = useState('Low')
 const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('General complaint submitted successfully!')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }



    return {
        urgency, setUrgency,
        handleInputChange,
        handleSubmit,
        formData,
        setFormData

    }
}