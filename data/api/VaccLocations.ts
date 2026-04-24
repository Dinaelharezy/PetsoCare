import { VaccLocation, VaccLocationForm, formToPayload } from '../../types/VaccLocation'

const BASE_URL = '/api/admin/locations'

// ─── GET ALL (with optional filters) ─────────────────────────────────────────
// data/api/VaccLocations.ts - الجزء الخاص بـ getAllLocations
export async function getAllLocations(params?: {
  type?:        number | string
  governorate?: string
  serviceType?: number | string
  isActive?:    boolean  // لازم يبقى موجود وبيشتغل
}): Promise<VaccLocation[]> {
  const query = new URLSearchParams()
  if (params?.type        != null) query.set('type',        String(params.type))
  if (params?.governorate)         query.set('governorate', params.governorate)
  if (params?.serviceType != null) query.set('serviceType', String(params.serviceType))
  if (params?.isActive    != null) query.set('isActive',    String(params.isActive))

  const url = query.toString() 
    ? `/api/user/locations?${query}`
    : '/api/user/locations'

  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch locations')
  return res.json()
}
// export async function getAllLocations(params?: {
//   type?:        number | string
//   governorate?: string
//   serviceType?: number | string
//   isActive?:    boolean
// }): Promise<VaccLocation[]> {
//   const query = new URLSearchParams()
//   if (params?.type        != null) query.set('type',        String(params.type))
//   if (params?.governorate)         query.set('governorate', params.governorate)
//   if (params?.serviceType != null) query.set('serviceType', String(params.serviceType))
//   if (params?.isActive    != null) query.set('isActive',    String(params.isActive))

//   // تصحيح المسار - إزالة الـ $ وإضافة الـ api كاملة
//   const url = query.toString() 
//     ? `/api/user/locations?${query}`  // تغيير: إزالة $ و/main/
//     : '/api/user/locations'           // تغيير: إزالة $ و/main/

//   const res = await fetch(url)
//   if (!res.ok) throw new Error('Failed to fetch locations')
//   return res.json()
// }


// ─── CREATE ───────────────────────────────────────────────────────────────────
export async function createLocation(
  form: VaccLocationForm
): Promise<{ message: string }> {
  const res = await fetch(BASE_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(formToPayload(form)),
  })
  if (!res.ok) throw new Error('Failed to create location')
  return res.json()
}

// ─── UPDATE ───────────────────────────────────────────────────────────────────
// data/api/VaccLocations.ts

// ─── UPDATE ───────────────────────────────────────────────────────────────────
// data/api/VaccLocations.ts

export async function updateLocation(
  id: number,
  form: VaccLocationForm
): Promise<{ message: string }> {
  const payload = {
    id: id,  // بعض APIs بتحتاج الـ id جوه البادي
    name: form.name,
    type: Number(form.type),  // لازم يكون رقم (1,2,3,4,5)
    location: form.address,   // ⚠️ الـ Backend بيطلب 'location' مش 'address'
    governorate: form.governorate,
    address: form.address,    // لو محتاج الاتنين
    phone: form.phone || null,
    hours: form.hours || null,
    note: form.note || null,
    providesVaccine: form.providesVaccine,
    serviceType: Number(form.serviceType),  // لازم يكون رقم (1,2,3,4)
    isActive: form.isActive
  }
  
  console.log('Sending payload:', payload)  // للتأكد
  
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(payload),
  })
  
  if (!res.ok) {
    const errorText = await res.text()
    console.error('Update failed:', res.status, errorText)
    throw new Error(`Failed to update location: ${res.status}`)
  }
  return res.json()
}

// ─── DELETE ───────────────────────────────────────────────────────────────────
export async function deleteLocation(id: number): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete location')
  return res.json()
}

// ─── TOGGLE isActive ──────────────────────────────────────────────────────────
// data/api/VaccLocations.ts - تعديل toggleLocation
export async function toggleLocation(id: number): Promise<{ message: string }> {
  try {
    console.log('Toggling location:', id)
    
    const res = await fetch(`${BASE_URL}/${id}/toggle`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    const text = await res.text()
    console.log('Toggle response:', text)
    
    if (!res.ok) {
      throw new Error(`Failed to toggle location: ${res.status}`)
    }
    
    // لو الـ response فاضي، ارجعي success
    if (!text || text.trim() === '') {
      return { message: 'Location toggled successfully' }
    }
    
    try {
      return JSON.parse(text)
    } catch {
      return { message: 'Location toggled successfully' }
    }
  } catch (error) {
    console.error('Toggle error:', error)
    throw error
  }
}