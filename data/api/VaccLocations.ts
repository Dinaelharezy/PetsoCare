
import { VaccLocation } from '../../types/VaccLocation'

const BASE_URL = '/api/location'

// 🔸 GET ALL
export async function getAllLocations(type?: string): Promise<VaccLocation[]> {
  const url = type
    ? `${BASE_URL}?type=${encodeURIComponent(type)}`
    : BASE_URL

  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch locations')

  return res.json()
}

// // 🔸 GET BY ID
// export async function getLocationById(id: number): Promise<VaccLocation> {
//   const res = await fetch(`${BASE_URL}/${id}`)
//   if (!res.ok) throw new Error('Failed to fetch location')

//   return res.json()
// }

// 🔸 CREATE
export async function createLocation(
  data: Partial<VaccLocation>
): Promise<{ message: string }> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error('Failed to create location')

  return res.json()
}

// // 🔸 UPDATE (important 👀)
// export async function updateLocation(
//   id: number,
//   data: Partial<VaccLocation>
// ): Promise<{ message: string }> {
//   const res = await fetch(`${BASE_URL}/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })

//   if (!res.ok) throw new Error('Failed to update location')

//   return res.json()
// }

// 🔸 DELETE
export async function deleteLocation(id: number): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) throw new Error('Failed to delete location')

  return res.json()
}