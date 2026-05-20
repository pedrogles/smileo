export interface IAppointment {
    patient_id: number;
    professional_id: number;
    service_id: number;
    start_datetime: string; // ISO string format
    notes?: string;   // ISO string format
    status?: 'scheduled' | 'in_progress' | 'completed' | 'canceled';
    created_at?: string;
    updated_at?: string;
}