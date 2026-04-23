// utils/vaccineMapper.ts
import { VaccineDose } from '../types/VaccSchedule';
import { VaccineSchedule } from '../types/VaccSchedule';

export function mapDoseToScheduleCard(
  dose: VaccineDose,
  schedule: VaccineSchedule,
  vaccineName: string = 'Rabies Vaccine'
): {
  schedule: VaccineSchedule;
  doseId: string;
  doseNumber: number;
  date: string;
  isTaken: boolean;
  isRegistered: boolean;
} {
  return {
    schedule: schedule,
    doseId: dose.id,
    doseNumber: dose.dose,
    date: dose.date,
    isTaken: dose.isTaken,
    isRegistered: true
  };
}