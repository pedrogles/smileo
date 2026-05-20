import { FormControl } from "@angular/forms";
import { IPatient } from "../interfaces/patient.interface";
import { IProfessional } from "../interfaces/professional.interface";
import { IService } from "../interfaces/service.interface";
import { IAppointment } from "../interfaces/appointment.interface";

export type AppointmentFormType = {
    patient: FormControl<IPatient | null>;
    professional: FormControl<IProfessional | null>;
    service: FormControl<IService | null>;
    date: FormControl<string>;
    hour: FormControl<string>;
    notes: FormControl<string>;
}

export type AppointmentStatus = 'scheduled' | 'in_progress' | 'completed' | 'canceled';

export type AppointmentStartDateTime = IAppointment['start_datetime'];

export type AppointmentTimeOptions = { 
    label: string, 
    value: string, 
    disabled: boolean 
}

export type AppointmentQueryResponse = {
  id: string;
  start_datetime: string;
  status: AppointmentStatus;
  notes: string;

  patient: {
    id: string;
    name: string;
  } | null;

  professional: {
    id: string;
    name: string;
  } | null;

  service: {
    id: string;
    name: string;
  } | null;
};