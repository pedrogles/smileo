import { FormControl } from "@angular/forms";

export type PersonalDataFormType = {
    name: FormControl<string>;
    birth: FormControl<string>;
    cpf: FormControl<string>;
};