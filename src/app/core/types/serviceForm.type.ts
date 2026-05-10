import { FormControl } from "@angular/forms";

export type ServiceFormType = {
    name: FormControl<string>;
    description: FormControl<string>;
    durationMinutes: FormControl<number>;
    price: FormControl<number>;
};