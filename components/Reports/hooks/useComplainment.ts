import { useState } from 'react'
import { apiUrl } from '@/lib/api'
export  function useComplainment() {

 const [urgency, setUrgency] = useState('Low')
 const [submitted, setSubmitted] = useState(false)
 const [image, setImage] = useState<File | null>(null)
 const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',})


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    setImage(e.target.files[0])
  }
}
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    const payload = {
      Name: formData.name,
  Email: formData.email,
  Phone: formData.phone,
  Subject: formData.subject,
  Message: formData.message,
  urgency:urgency,
  image:image,
    }

  const res = await fetch(apiUrl('report/complaint'), {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
})

if (!res.ok) {
  let errorMessage

  const contentType = res.headers.get('content-type')

  if (contentType && contentType.includes('application/json')) {
    const err = await res.json()
    errorMessage = JSON.stringify(err)
  } else {
    errorMessage = await res.text()
  }

  throw new Error(errorMessage || 'Submission failed')
}

// 👇 هنا تحطي الكود بتاعك
let result

const contentType = res.headers.get('content-type')

if (contentType && contentType.includes('application/json')) {
  result = await res.json()
} else {
  result = await res.text()
}
setSubmitted(true)
console.log("✅ Result:", result)


  } catch (err: unknown) {
    console.error(err)
    alert(err instanceof Error ? err.message : 'Something went wrong')
  }
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
        setFormData,
        submitted,
handleImageChange,
image,
setImage,
    }
}