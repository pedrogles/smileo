import { AppointmentStatus } from "../types/appointment.type";

export interface IAppointment {
    readonly id: string;
    patient_id: number;
    professional_id: number;
    service_id: number;
    start_datetime: string;
    notes?: string;
    status: AppointmentStatus;
    created_at?: string;
    updated_at?: string;

    /*
      Relations
    */

    patient?: {
        id: string;
        name: string;
    };

    professional?: {
        id: string;
        name: string;
    };

    service?: {
        id: string;
        name: string;
    };
}