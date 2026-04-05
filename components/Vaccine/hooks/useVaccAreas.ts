import { useState } from 'react'



export  function useVaccAreas() {

const GOVERNORATES = [
  { id: 'port-said', name: 'Port Said', hasData: true },
  { id: 'cairo', name: 'Cairo', hasData: false },
  { id: 'ismailia', name: 'Ismailia', hasData: false },
  { id: 'giza', name: 'Giza', hasData: false },
]

const PORT_SAID_DISTRICTS = [
  {
    name: 'Al-Sharq District',
    campaign: 'Vaccination campaign conducted',
    icon: '🐕',
  },
  {
    name: 'Al-Manakh District',
    campaign: 'Vaccination campaign conducted',
    icon: '🐕',
  },
  {
    name: 'Al-Arab District',
    campaign: 'Campaign to vaccinate stray dogs against rabies as part of the initiative "Egypt Free of Rabies"',
    icon: '🐕',
  },
  {
    name: 'Al-Dawahi District',
    campaign: 'Large-scale campaign to vaccinate stray dogs against rabies',
    icon: '🐕',
  },
  {
    name: 'Al-Zohour District',
    campaign: 'Campaign to vaccinate stray dogs',
    icon: '🐕',
  },
  {
    name: 'Al-Janoub District',
    campaign: 'Field campaign to vaccinate stray dogs',
    icon: '🐕',
  },
  {
    name: 'Al-Gharb District',
    campaign: 'Vaccination campaign conducted',
    icon: '🐕',
  },
  {
    name: 'Port Fouad City',
    campaign: 'Vaccination campaign conducted',
    icon: '🏙️',
  },
]


  const [selectedGov, setSelectedGov] = useState('port-said')

  const selected = GOVERNORATES.find(g => g.id === selectedGov)


    return {
selectedGov,
setSelectedGov,
selected,
PORT_SAID_DISTRICTS,
GOVERNORATES
    }
}