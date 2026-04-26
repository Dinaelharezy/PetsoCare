import { VaccLocation, VaccLocationForm, formToPayload } from '../../types/VaccLocation'

const BASE_URL = '/api/admin/locations'

// ─── GET ALL (with optional filters) ─────────────────────────────────────────
// data/api/VaccLocations.ts - الجزء الخاص بـ getAllLocations
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
export async function updateLocation(
  id: number,
  form: VaccLocationForm
): Promise<{ message: string }> {
  // ✅ 1: تحويل القيم للأرقام الصحيحة
  const typeNum = Number(form.type);
  const serviceTypeNum = Number(form.serviceType);

  // ✅ 2: التحقق من صحة القيم قبل الإرسال
  if (isNaN(typeNum) || typeNum < 1 || typeNum > 5) {
    throw new Error('Invalid location type. Must be between 1 and 5');
  }
  if (isNaN(serviceTypeNum) || serviceTypeNum < 1 || serviceTypeNum > 4) {
    throw new Error('Invalid service type. Must be between 1 and 4');
  }
  if (!form.address || form.address.trim() === '') {
    throw new Error('Address is required');
  }

  // ✅ 3: بناء الـ payload بالشكل المطلوب
  const payload = {
    id: id,
    name: form.name,
    type: typeNum,                      // ✅ رقم صحيح
    location: form.address,             // ✅ 'location' مش 'address'
    governorate: form.governorate,
    address: form.address,
    phone: form.phone || "",
    hours: form.hours || "",
    note: form.note || "",
    providesVaccine: form.providesVaccine === true,
    serviceType: serviceTypeNum,        // ✅ رقم صحيح
    isActive: form.isActive === true,
  };

  console.log("📤 Sending payload:", JSON.stringify(payload, null, 2));

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseText = await res.text();
  console.log("📥 Response:", responseText);

  if (!res.ok) {
    throw new Error(`Failed to update location: ${res.status} - ${responseText}`);
  }

  return responseText ? JSON.parse(responseText) : { message: "Location updated successfully" };
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