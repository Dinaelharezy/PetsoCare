import { VaccLocation, VaccLocationForm, formToPayload } from '../../types/VaccLocation'

const BASE_URL = '/api/admin/locations'

// ─── GET ALL (with optional filters) ─────────────────────────────────────────

export async function getAllLocations(params?: {
  type?:        number | string
  governorate?: string
  serviceType?: number | string
  isActive?:    boolean  
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



// ─── CREATE ───────────────────────────────────────────────────────────────────

export async function createLocation(
  payload: any  // ✅ استخدم any أو Record<string, unknown>
): Promise<{ message: string }> {
  const res = await fetch(BASE_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to create location')
  return res.json()
}

// UPDATE ---------------

export async function updateLocation(
  id: number,
  payload: Record<string, unknown>  
): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method:  'PUT',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  })

  const responseText = await res.text()
  console.log('📥 Response:', responseText)

  if (!res.ok) {
    throw new Error(`Failed to update location: ${res.status} - ${responseText}`)
  }

  return responseText ? JSON.parse(responseText) : { message: 'Location updated successfully' }
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