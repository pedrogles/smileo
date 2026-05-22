import { AppointmentStatus } from "../../../core/types/appointment.type";

export interface DashboardAppointmentTableDTO {
  id: string;
  patient_id: string;
  professional_id: string;
  service_id: string;
  patient_name: string;
  professional_name: string;
  service_name: string;
  start_datetime: string;
  status: AppointmentStatus;
  notes?: string;
}