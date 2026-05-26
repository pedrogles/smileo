export interface CreatePatientDTO {
    name: string;
    birth: string;
    cpf: string;
    phone: string;
    email: string;
    has_allergies: boolean;
    allergies_notes: string;
    has_medical_conditions: boolean;
    medical_conditions_notes: string;
}