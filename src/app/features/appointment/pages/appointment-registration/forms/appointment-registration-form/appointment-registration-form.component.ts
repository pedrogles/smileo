import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentFormType, AppointmentTimeOptions } from '../../../../../../core/types/appointment.type';
import { combineLatest, debounceTime, distinctUntilChanged, filter, Observable, switchMap } from 'rxjs';
import { IPatient } from '../../../../../../core/interfaces/patient.interface';;
import { IProfessional } from '../../../../../../core/interfaces/professional.interface';
import { IService } from '../../../../../../core/interfaces/service.interface';
import { CreateAppointmentDTO } from '../../../../dtos/create-appointment.dto';
import { AppointmentService } from '../../../../services/appointment/appointment.service';
import { ToastService } from '../../../../../../core/services/toast/toast.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ServiceService } from '../../../../../service/services/service.service';
import { ProfessionalService } from '../../../../../professional/services/profissional/professional.service';
import { PatientService } from '../../../../../patient/services/patient/patient.service';
import { FormSectionHeaderComponent } from '../../../../../../shared/components/form-section-header/form-section-header.component';

@Component({
  selector: 'app-appointment-registration-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule, 
    FormSectionHeaderComponent
  ],
  templateUrl: './appointment-registration-form.component.html',
  styleUrl: './appointment-registration-form.component.scss'
})
export class AppointmentRegistrationFormComponent {
  appointmentForm!: FormGroup<AppointmentFormType>;
  isLoading = false;
  
  patients$!: Observable<IPatient[]>;
  professionals$!: Observable<IProfessional[]>;
  services$!: Observable<IService[]>;

  appointmentTimeOptions: AppointmentTimeOptions[] = [ 
    { label: '08:00', value: '08:00', disabled: true }, 
    { label: '09:00', value: '09:00', disabled: true }, 
    { label: '10:00', value: '10:00', disabled: true }, 
    { label: '11:00', value: '11:00', disabled: true }, 
    { label: '13:00', value: '13:00', disabled: true }, 
    { label: '14:00', value: '14:00', disabled: true }, 
    { label: '15:00', value: '15:00', disabled: true }, 
    { label: '16:00', value: '16:00', disabled: true }, 
    { label: '17:00', value: '17:00', disabled: true }, 
    { label: '18:00', value: '18:00', disabled: true }, 
    { label: '19:00', value: '19:00', disabled: true }, 
    { label: '20:00', value: '20:00', disabled: true }
  ];

  private readonly formBuilder = inject(FormBuilder);
  private readonly toast = inject(ToastService);
  private readonly appointmentService = inject(AppointmentService);
  private readonly patientService = inject(PatientService);
  private readonly professionalService = inject(ProfessionalService);
  private readonly serviceService = inject(ServiceService);

  ngOnInit(): void { 
    this.initializeForm();
    this.watchFormChanges();
  }

  private initializeForm(): void {
    this.appointmentForm = this.formBuilder.group<AppointmentFormType>({
      patient: new FormControl<IPatient | null>(null, Validators.required),
      professional: new FormControl<IProfessional | null>(null, Validators.required),
      service: new FormControl<IService | null>(null, Validators.required),
      date: new FormControl<string>('', 
        { nonNullable: true, validators: Validators.required }),
      hour: new FormControl<string>('', 
        { nonNullable: true, validators: Validators.required }),
      notes: new FormControl<string>('', 
        { nonNullable: true, validators: Validators.maxLength(500) })
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    if (this.appointmentForm.valid) {
      const appointmentDTO = this.buildCreateAppointmentDTO();
      this.appointmentService.create(appointmentDTO).subscribe({
        next: () => {
          this.toast.show(`Consulta agendada com sucesso!`, 'success');
          this.appointmentForm.reset();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error creating appointment:', error);
          this.toast.show('Erro ao agendar consulta. Por favor, tente novamente.', 'error');
          this.isLoading = false;
        }
      });
    }
  }

  private buildCreateAppointmentDTO(): CreateAppointmentDTO {
    const form = this.appointmentForm.getRawValue();
    return {
      patient_id: form.patient!.id,
      professional_id: form.professional!.id,
      service_id: form.service!.id,
      start_datetime: this.startDateTime(form.date, form.hour),
      notes: form.notes
    };
  }

  private startDateTime(date: string, hour: string): string {
    const isoString = `${date}T${hour}:00`;
    const parsed = new Date(isoString);
    if (isNaN(parsed.getTime())) {
      this.toast.show(`Data final inválida`, 'error');
      throw new Error('Data final inválida');
    }
    return parsed.toISOString();
  }

  private watchFormChanges(): void {
    this.listenPatientSearch();
    this.listenProfessionalSearch();
    this.listenServiceSearch();
    this.listenFormChanges();
  }

  private listenPatientSearch(): void {
    const control = this.formControls.patient;

    this.patients$ = control!.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((value: string | IPatient | null): value is string =>
        typeof value === 'string' && value.length >= 3
      ),
      switchMap(search => this.patientService.search(search))
    );
  }

  private listenProfessionalSearch(): void {
    const control = this.formControls.professional;

    this.professionals$ = control!.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((value: string | IProfessional | null): value is string =>
        typeof value === 'string' && value.length >= 3
      ),
      switchMap(search => this.professionalService.search(search))
    );
  }

  private listenServiceSearch(): void {
    const control = this.formControls.service;

    this.services$ = control!.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((value: string | IService | null): value is string =>
        typeof value === 'string' && value.length >= 3
      ),
      switchMap(search => this.serviceService.search(search))
    );
  }

  private listenFormChanges(): void {
    combineLatest([
      this.formControls.professional.valueChanges,
      this.formControls.date.valueChanges
    ])
    .pipe(
      debounceTime(500),
      filter(([professional, date]) => !!professional && !!date),
      distinctUntilChanged(([prevProf, prevDate], [currProf, currDate]) =>
        prevProf?.id === currProf?.id && prevDate === currDate
      )
    )
    .subscribe(([professional, date]) => {
      this.getProfessionalAppointmentsByDate(
        professional!.id,
        date
      );
    });
  }

  displayInputName(input: IPatient | IProfessional | IService): string {
    return input ? input.name : '';
  }

  private getProfessionalAppointmentsByDate(professionalId: string, date: string): void {
    this.appointmentService
    .getProfessionalAppointmentsByDate(
      professionalId, 
      date
    )
    .subscribe({
      next: (appointments) => {
        const bookedTimes = appointments.map((appt: any) => 
          new Date(appt).toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        );
        for (let option of this.appointmentTimeOptions) {
          bookedTimes.includes(option.value) ? option.disabled = true : option.disabled = false;
        }
      }
    });
  }

  get formControls(): typeof this.appointmentForm.controls {
      return this.appointmentForm.controls;
  }
}
