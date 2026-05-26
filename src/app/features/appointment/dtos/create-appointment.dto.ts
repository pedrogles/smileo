export interface CreateAppointmentDTO {
    patient_id: string;
    professional_id: string;
    service_id: string;
    start_datetime: string; // ISO 8601 (ex: 2026-02-12T14:00:00)
    notes: string;
}