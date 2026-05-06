import { FormControl } from "@angular/forms";

export type ClinicalInformationFormType = {
    hasAllergies: FormControl<boolean>;
    hasMedicalConditions: FormControl<boolean>;
    allergiesNotes: FormControl<string>;
    medicalConditionsNotes: FormControl<string>;
};