// utils/vaccineMapper.ts
import { DoseDay } from '../types/VaccSchedule';
import { VaccSchedule } from '../types/VaccSchedule';

export function mapDoseToScheduleCard(
  dose: DoseDay,
  schedule:  VaccSchedule,
  vaccineName: string = 'Rabies Vaccine'
): {
  schedule:  VaccSchedule;
  doseId: string;
  doseNumber: number;
  date: string;
  isTaken: boolean;
  isRegistered: boolean;
} {
  return {
    schedule,
    doseId:       String(dose.day),      
    doseNumber:   typeof dose.day === 'number' ? dose.day : parseInt(String(dose.day)) || 0,
    date:         dose.label,            
    isTaken:      false,                 
    isRegistered: true,
  };
}

