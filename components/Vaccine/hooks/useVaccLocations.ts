
import { useState } from 'react'
import { Tab } from 'react-bootstrap'
export  function useVaccLocations() {
type Tab = 'animal' | 'human' | 'area'
  const [activeTab, setActiveTab] = useState<Tab>('animal')
  const ANIMAL_LOCATIONS = [
  {
    name: 'Port Said Veterinary Medicine Directorate',
    address: 'New Qabuti Area, South of the Governorate',
    phone: null,
    hours: null,
    note: 'Responsible for implementing vaccination campaigns against rabies for stray dogs under national initiatives (Ministry of Agriculture & General Organization for Veterinary Services — "Rabies-Free Egypt 2030").',
    services: 'Stray Animal Rabies Vaccination Campaigns',
  },
  {
    name: 'Pet Animal Hospital – Old Qabuti',
    address: 'Behind Al-Nour Housing',
    phone: null,
    hours: null,
    note: null,
    services: 'Animal Rabies Vaccination',
  },
  {
    name: 'Pet Animal Hospital – Port Fouad',
    address: 'Behind Port Fouad Secondary School for Girls',
    phone: null,
    hours: null,
    note: null,
    services: 'Animal Rabies Vaccination',
  },
]

const HUMAN_LOCATIONS = [
  {
    name: 'Port Said Health Affairs Directorate',
    address: 'Al-Nahda Street, off Mohamed Ali Street, El-Sharq District, Port Said',
    phone: null,
    hours: null,
    isInquiryOnly: true,
    note: 'Main authority for organizing health services. Use this to inquire about health centers providing human rabies vaccine (PEP). This is NOT a location for receiving the vaccine directly.',
    services: 'Inquiries & Referrals Only',
  },
  {
    name: 'Al-Hayah Hospital – Port Fouad',
    address: 'Al-Obour Housing, Port Fouad',
    phone: '0663400849',
    hours: null,
    isInquiryOnly: false,
    note: null,
    services: 'Emergency – Human Rabies Vaccine (PEP)',
  },
  {
    name: '30 June Hospital',
    address: 'Al-Ganoub District, First Axis of 30 June, Port Said',
    phone: '0663254111',
    hours: null,
    isInquiryOnly: false,
    note: 'Comprehensive government hospital within the General Authority for Healthcare. Also reachable via hotline 15344.',
    services: 'Emergency – Human Rabies Vaccine (PEP)',
  },
  {
    name: 'Al-Salam Hospital (formerly Al-Amiri Hospital)',
    address: 'Safeya Zaghloul Street (Eugina), El-Sharq District, Port Said',
    phone: null,
    hours: null,
    isInquiryOnly: false,
    note: null,
    services: 'Emergency – Human Rabies Vaccine (PEP)',
  },
  {
    name: 'Health Unit – Al-Manakh',
    address: 'Al-Manakh District, Port Said',
    phone: '15344',
    hours: null,
    isInquiryOnly: false,
    note: 'Ministry of Health affiliate. Call hotline 15344 to confirm services.',
    services: 'Primary Healthcare – PEP Inquiries',
  },
  {
    name: 'Health Unit – Al-Dawahi',
    address: 'Al-Dawahi District, Port Said',
    phone: '15344',
    hours: null,
    isInquiryOnly: false,
    note: 'Ministry of Health affiliate. Call hotline 15344 to confirm services.',
    services: 'Primary Healthcare – PEP Inquiries',
  },
]
return {
    Tab,
    activeTab, setActiveTab,
    ANIMAL_LOCATIONS,
    HUMAN_LOCATIONS
}

}