import { FormControl } from "@angular/forms";

export type ProfessionalFormType = {
    specialty: FormControl<string>;
    cro_number: FormControl<string>;
    cro_state: FormControl<boolean>;
    is_active: FormControl<string>;
};