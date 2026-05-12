import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonalDataFormType } from '../../../../../../core/types/personalDataForm.type';
import { ContactFormType } from '../../../../../../core/types/contactForm.type';
import { ProfessionalService } from '../../../../../professional/services/profissional/professional.service';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormSectionHeaderComponent } from '../../../../../../shared/components/form-section-header/form-section-header.component';
import { CreateProfessionalDTO } from '../../../../dtos/create-professional.dto';
import { ProfessionalFormType } from '../../../../../../core/types/professionalDataForm.type';

@Component({
  selector: 'app-professional-registration-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCheckboxModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    FormSectionHeaderComponent
  ],
  templateUrl: './professional-registration-form.component.html',
  styleUrl: './professional-registration-form.component.scss'
})
export class ProfessionalRegistrationFormComponent {
  professionalForm!: FormGroup<{
    personalData: FormGroup<PersonalDataFormType>;
    contact: FormGroup<ContactFormType>;
    professionalInformation: FormGroup<ProfessionalFormType>;
  }>;

  isLoading = false;

  private readonly formBuilder = inject(FormBuilder);
  private readonly professionalService = inject(ProfessionalService);

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.professionalForm = this.formBuilder.group({
      personalData: this.formBuilder.group<PersonalDataFormType>({
        name: new FormControl<string>('', 
          { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
        birth: new FormControl<string>('', 
          { nonNullable: true, validators: [Validators.required, Validators.maxLength(10)] }),
        cpf: new FormControl<string>('', 
          { nonNullable: true, validators: [Validators.required] })
      }),
      contact: this.formBuilder.group<ContactFormType>({
        phone: new FormControl<string>('', 
          { nonNullable: true, validators: [Validators.required, Validators.minLength(11)] }),
        email: new FormControl<string>('', 
          { nonNullable: true, validators: [Validators.required, Validators.email] }),
      }),
      professionalInformation: this.formBuilder.group<ProfessionalFormType>({
        specialty: new FormControl<string>('', 
          { nonNullable: true, validators: [Validators.required] }),
        cro_number: new FormControl<string>('', 
          { nonNullable: true, validators: [Validators.required] }),
        cro_state: new FormControl<boolean>(false, 
          { nonNullable: true, validators: [Validators.required] }),
        is_active: new FormControl<string>('true', 
          { nonNullable: true, validators: [Validators.required] }),
      })
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    const professionalData: CreateProfessionalDTO = this.buildCreateProfessionalDTO();
    console.log('Professional Data to be submitted:', professionalData);
    this.professionalService.create(professionalData).subscribe({
        next: (createdProfessional) => {
          console.log(`Profissional "${createdProfessional.name}" cadastrado(a) com sucesso!`);
          this.professionalForm.reset();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error creating professional:', error);
          this.isLoading = false;
        }
    });
  }

  private buildCreateProfessionalDTO(): CreateProfessionalDTO {
    const formValue = this.professionalForm.getRawValue();
    return {
      name: formValue.personalData.name,
      birth: formValue.personalData.birth,
      cpf: formValue.personalData.cpf,
      phone: formValue.contact.phone,
      email: formValue.contact.email,
      specialty: formValue.professionalInformation.specialty,
      cro_number: formValue.professionalInformation.cro_number,
      cro_state: formValue.professionalInformation.cro_state,
      is_active: formValue.professionalInformation.is_active,
    };
  }

  get personalDataGroup(): FormGroup {
    return this.professionalForm.get('personalData') as FormGroup;
  }

  get contactGroup(): FormGroup {
    return this.professionalForm.get('contact') as FormGroup;
  }

  get professionalInformationGroup(): FormGroup {
    return this.professionalForm.get('professionalInformation') as FormGroup;
  }
}