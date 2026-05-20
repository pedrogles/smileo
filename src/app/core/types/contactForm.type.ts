import { FormControl } from "@angular/forms";

export type ContactFormType = {
    phone: FormControl<string>;
    email: FormControl<string>;
};