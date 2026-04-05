

import { useState } from 'react'
import { VaccSchedule } from '../../../types/VaccSchedule'

const SCHEDULES: VaccSchedule[] = [
  {
    id: 'prep-who',
    title: 'Pre-Exposure (PrEP) — WHO Protocol',
    subtitle: 'For individuals at risk: veterinarians, lab workers, animal handlers, children in endemic areas, travelers',
    type: 'human',
    doses: [
      { day: 0,  label: 'Day 0',         note: 'First dose' },
      { day: 7,  label: 'Day 7',         note: 'Second dose' },
      { day: 28, label: 'Day 21 or 28',  note: 'Third dose' },
    ],
    notes: [
      'Inject into the deltoid muscle for adults; anterolateral thigh for young children.',
      'Avoid the gluteal region.',
    ],
  },
  {
    id: 'pep-who-5dose',
    title: 'Post-Exposure (PEP) 5-Dose — WHO Protocol',
    subtitle: 'Most common protocol. Used when bitten/scratched by a suspected rabid animal.',
    type: 'human',
    doses: [
      { day: 0,  label: 'Day 0',  note: 'First dose (+ RIG if Category III)' },
      { day: 3,  label: 'Day 3',  note: 'Second dose' },
      { day: 7,  label: 'Day 7',  note: 'Third dose' },
      { day: 14, label: 'Day 14', note: 'Fourth dose' },
      { day: 28, label: 'Day 28', note: 'Fifth dose' },
      { day: 90, label: 'Day 90', note: 'Booster (physician evaluation)' },
    ],
    notes: [
      'Day 0 = the day of exposure (bite).',
      'Inject into deltoid muscle (adults & children ≥2 years), or anterolateral thigh (younger children).',
      'Gluteal region is contraindicated.',
    ],
  },
  {
    id: 'pep-who-4dose',
    title: 'Post-Exposure (PEP) 4-Dose — WHO Protocol',
    subtitle: 'Alternative protocol (used in some settings).',
    type: 'human',
    doses: [
      { day: 0,  label: 'Day 0',         note: 'Two doses (right arm + left arm)' },
      { day: 7,  label: 'Day 7',         note: 'One dose' },
      { day: 28, label: 'Day 21 or 28',  note: 'One dose' },
      { day: 90, label: 'Day 90',        note: 'Booster (physician evaluation)' },
    ],
    notes: [
      'Schedule is determined by physician instructions and approved protocol.',
      'Booster after Day 90 may be required depending on risk level and antibody testing.',
    ],
  },
  {
    id: 'pep-egypt-domestic',
    title: 'PEP — Egypt Protocol (Domestic/Observable Animal)',
    subtitle: 'Egyptian Ministry of Health — For bites from domestic animals that can be observed for 10 days.',
    type: 'human',
    doses: [
      { day: 0, label: 'Day 0', note: 'First dose' },
      { day: 3, label: 'Day 3', note: 'Second dose' },
      { day: 7, label: 'Day 7', note: 'Third dose — discontinued if no behavioral changes on Day 10' },
    ],
    notes: [
      'Animal must be domestic/known and available for observation.',
      'Observe the animal for 10 days from the bite date.',
      'If no behavioral changes appear in the animal, discontinue vaccination at the end of Day 10.',
    ],
  },
  {
    id: 'pep-egypt-stray',
    title: 'PEP — Egypt Protocol (Stray/Unobservable Animal)',
    subtitle: 'Egyptian Ministry of Health — For bites from stray animals that cannot be observed. Updated August 2025.',
    type: 'human',
    doses: [
      { day: 0,  label: 'Day 0',  note: 'First dose' },
      { day: 3,  label: 'Day 3',  note: 'Second dose' },
      { day: 7,  label: 'Day 7',  note: 'Third dose' },
      { day: 14, label: 'Day 14', note: 'Fourth dose' },
    ],
    notes: [
      'For immunocompromised individuals: a fifth dose should be given on Day 28.',
      'Proof of immunodeficiency is required for the fifth dose.',
      'August 2025 update: PEP doses updated to 4 doses (0, 3, 7, 14) instead of 5.',
      'If a dose is missed, complete remaining doses regardless of delay.',
    ],
  },
  {
    id: 'animal-vaccine',
    title: 'Animal Vaccination Schedule (Dogs & Cats)',
    subtitle: 'Annual rabies vaccination for owned pets.',
    type: 'animal',
    doses: [],
    notes: [
      'Dogs: First dose from 3 months to 1 year of age; repeat every 1–3 years.',
      'Cats: First dose from 3 months to 1 year of age; repeat every 1–3 years.',
      'Dogs must be muzzled and kept on a leash per regulatory requirements.',
    ],
  },
]

export const EXPOSURE_CATEGORIES = [
  {
    cat: 'Category I',
    color: '#198754',
    exposure: 'Touching or feeding the animal, or the animal licking intact (unbroken) skin',
    action: 'Wash the exposed skin thoroughly. No further prophylaxis is required.',
    vaccine: false,
    rig: false,
  },
  {
    cat: 'Category II',
    color: '#fd7e14',
    exposure: 'Minor bites on exposed skin, or minor scratches or abrasions without bleeding',
    action: 'Wash the wound thoroughly and administer the vaccine immediately.',
    vaccine: true,
    rig: false,
  },
  {
    cat: 'Category III',
    color: '#dc3545',
    exposure:
      'Single or multiple bites/scratches penetrating the skin; contamination of mucous membranes or broken skin with animal saliva; licking of broken skin; direct bat exposure',
    action: 'Wash the wound thoroughly, administer rabies vaccine immediately, and give Rabies Immunoglobulin (RIG).',
    vaccine: true,
    rig: true,
  },
]

export function useVaccSchedule() {
  const [tab, setTab] = useState<'human' | 'animal'>('human')
  const visibleSchedules = SCHEDULES.filter(s => s.type === tab)

  return {
    tab,
    setTab,
    visibleSchedules,
    SCHEDULES,
  }
}