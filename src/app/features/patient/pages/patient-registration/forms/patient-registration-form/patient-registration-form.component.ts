import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonalDataFormType } from '../../../../../../core/types/personalDataForm.type';
import { ContactFormType } from '../../../../../../core/types/contactForm.type';
import { ClinicalInformationFormType } from '../../../../../../core/types/clinicalInformation.type';
import { PatientService } from '../../../../services/patient/patient.service';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormSectionHeaderComponent } from '../../../../../../shared/components/form-section-header/form-section-header.component';
import { CreatePatientDTO } from '../../../../dtos/create-patient.dto';
import { ToastService } from '../../../../../../core/services/toast/toast.service';

@Component({
  selector: 'app-patient-registration-form',
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
  templateUrl: './patient-registration-form.component.html',
  styleUrl: './patient-registration-form.component.scss'
})
export class PatientRegistrationFormComponent {
  patientForm!: FormGroup<{
    personalData: FormGroup<PersonalDataFormType>;
    contact: FormGroup<ContactFormType>;
    clinicalInformation: FormGroup<ClinicalInformationFormType>;
  }>;

  isLoading = false;

  private readonly formBuilder = inject(FormBuilder);
  private readonly patientService = inject(PatientService);
  private readonly toastService = inject(ToastService);

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.patientForm = this.formBuilder.group({
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
      clinicalInformation: this.formBuilder.group<ClinicalInformationFormType>({
        hasAllergies: new FormControl<boolean>(false, { nonNullable: true }),
        allergiesNotes: new FormControl<string>('', { 
          nonNullable: true, 
          validators: [Validators.maxLength(255)] 
        }),
        hasMedicalConditions: new FormControl<boolean>(false, { nonNullable: true }),
        medicalConditionsNotes: new FormControl<string>('', { 
          nonNullable: true, 
          validators: [Validators.maxLength(255)] 
        })
      })
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    const patientData: CreatePatientDTO = this.buildCreatePatientDTO();
    console.log('Patient Data to be submitted:', patientData);
    this.patientService.create(patientData).subscribe({
        next: (createdPatient) => {
          this.toastService.show(`Paciente "${createdPatient.name}" cadastrado(a) com sucesso!`, 'success');
          this.patientForm.reset();
          this.isLoading = false;
        },
        error: (error) => {
          this.toastService.show('Erro ao cadastrar paciente.', 'error');
          console.error('Error creating patient:', error);
          this.isLoading = false;
        }
    });
  }

  private buildCreatePatientDTO(): CreatePatientDTO {
    const formValue = this.patientForm.getRawValue();
    return {
      name: formValue.personalData.name,
      birth: formValue.personalData.birth,
      cpf: formValue.personalData.cpf,
      phone: formValue.contact.phone,
      email: formValue.contact.email,
      has_allergies: formValue.clinicalInformation.hasAllergies,
      allergies_notes: formValue.clinicalInformation.allergiesNotes,
      has_medical_conditions: formValue.clinicalInformation.hasMedicalConditions,
      medical_conditions_notes: formValue.clinicalInformation.medicalConditionsNotes,
    };
  }


  get personalDataGroup(): FormGroup {
      return this.patientForm.get('personalData') as FormGroup;
  }

  get contactGroup(): FormGroup {
    return this.patientForm.get('contact') as FormGroup;
  }

  get clinicalInformationGroup(): FormGroup {
    return this.patientForm.get('clinicalInformation') as FormGroup;
  }
}
