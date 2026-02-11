'use client'
import { usePathname } from 'next/navigation'

export function usePath() {
  return usePathname()
}