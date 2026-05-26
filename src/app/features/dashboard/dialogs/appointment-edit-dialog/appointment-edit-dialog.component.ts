import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AppointmentFormType, AppointmentTimeOptions } from '../../../../core/types/appointment.type';
import { IPatient } from '../../../../core/interfaces/patient.interface';
import { IProfessional } from '../../../../core/interfaces/professional.interface';
import { IService } from '../../../../core/interfaces/service.interface';
import { DashboardAppointmentTableDTO } from '../../dtos/dashboard-appointment-table.dto';
import { DashboardService } from '../../services/dashboard.service';
import { AppointmentService } from '../../../appointment/services/appointment/appointment.service';
import { PatientService } from '../../../patient/services/patient/patient.service';
import { ProfessionalService } from '../../../professional/services/profissional/professional.service';
import { ServiceService } from '../../../service/services/service.service';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { combineLatest, debounceTime, distinctUntilChanged, filter, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-appointment-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './appointment-edit-dialog.component.html',
  styleUrl: './appointment-edit-dialog.component.scss'
})
export class AppointmentEditDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AppointmentEditDialogComponent>);
  readonly data = inject<DashboardAppointmentTableDTO>(MAT_DIALOG_DATA);
  private readonly formBuilder = inject(FormBuilder);
  private readonly dashboardService = inject(DashboardService);
  private readonly appointmentService = inject(AppointmentService);
  private readonly patientService = inject(PatientService);
  private readonly professionalService = inject(ProfessionalService);
  private readonly serviceService = inject(ServiceService);
  private readonly toast = inject(ToastService);

  appointmentForm!: FormGroup<AppointmentFormType>;
  isLoading = false;

  patients$!: Observable<IPatient[]>;
  professionals$!: Observable<IProfessional[]>;
  services$!: Observable<IService[]>;

  appointmentTimeOptions: AppointmentTimeOptions[] = [
    { label: '08:00', value: '08:00', disabled: false },
    { label: '09:00', value: '09:00', disabled: false },
    { label: '10:00', value: '10:00', disabled: false },
    { label: '11:00', value: '11:00', disabled: false },
    { label: '13:00', value: '13:00', disabled: false },
    { label: '14:00', value: '14:00', disabled: false },
    { label: '15:00', value: '15:00', disabled: false },
    { label: '16:00', value: '16:00', disabled: false },
    { label: '17:00', value: '17:00', disabled: false },
    { label: '18:00', value: '18:00', disabled: false },
    { label: '19:00', value: '19:00', disabled: false },
    { label: '20:00', value: '20:00', disabled: false }
  ];

  ngOnInit(): void {
    this.initializeForm();
    this.watchFormChanges();
  }

  private initializeForm(): void {
    const [datePart, timePart] = this.data.start_datetime.split(' - ');
    const [day, month, year] = datePart.split('/');
    const formattedDate = `${year}-${month}-${day}`;

    this.appointmentForm = this.formBuilder.group<AppointmentFormType>({
      patient: new FormControl<IPatient | null>({ id: this.data.patient_id, name: this.data.patient_name } as IPatient, Validators.required),
      professional: new FormControl<IProfessional | null>({ id: this.data.professional_id, name: this.data.professional_name } as IProfessional, Validators.required),
      service: new FormControl<IService | null>({ id: this.data.service_id, name: this.data.service_name } as IService, Validators.required),
      date: new FormControl<string>(formattedDate, { nonNullable: true, validators: Validators.required }),
      hour: new FormControl<string>(timePart, { nonNullable: true, validators: Validators.required }),
      notes: new FormControl<string>(this.data.notes ?? '', { nonNullable: true, validators: Validators.maxLength(500) })
    });
  }

  private watchFormChanges(): void {
    this.listenPatientSearch();
    this.listenProfessionalSearch();
    this.listenServiceSearch();
    this.listenDateProfessionalChanges();
  }

  private listenPatientSearch(): void {
    this.patients$ = this.formControls.patient.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((value: any): value is string => typeof value === 'string' && value.length >= 3),
      switchMap((search: string) => this.patientService.search(search))
    );
  }

  private listenProfessionalSearch(): void {
    this.professionals$ = this.formControls.professional.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((value: any): value is string => typeof value === 'string' && value.length >= 3),
      switchMap((search: string) => this.professionalService.search(search))
    );
  }

  private listenServiceSearch(): void {
    this.services$ = this.formControls.service.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((value: any): value is string => typeof value === 'string' && value.length >= 3),
      switchMap((search: string) => this.serviceService.search(search))
    );
  }

  private listenDateProfessionalChanges(): void {
    combineLatest([
      this.formControls.professional.valueChanges,
      this.formControls.date.valueChanges
    ]).pipe(
      debounceTime(500),
      filter(([professional, date]) => !!professional && !!date),
      distinctUntilChanged(([prevProf, prevDate], [currProf, currDate]) =>
        prevProf?.id === currProf?.id && prevDate === currDate
      )
    ).subscribe(([professional, date]) => {
      this.appointmentService.getProfessionalAppointmentsByDate(professional!.id, date)
        .subscribe(appointments => {
          const bookedTimes = appointments.map((appt: any) => {
            const d = new Date(appt);
            const hours = d.getUTCHours().toString().padStart(2, '0');
            const minutes = d.getUTCMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
          });
          for (let option of this.appointmentTimeOptions) {
            bookedTimes.includes(option.value) ? option.disabled = true : option.disabled = false;
          }
        });
    });
  }

  displayInputName(input: IPatient | IProfessional | IService): string {
    return input ? input.name : '';
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid) return;
    this.isLoading = true;
    const form = this.appointmentForm.getRawValue();
    const isoString = `${form.date}T${form.hour}:00`;
    const start_datetime = new Date(isoString).toISOString();

    this.dashboardService.updateAppointment(this.data.id, {
      patient_id: form.patient!.id,
      professional_id: form.professional!.id,
      service_id: form.service!.id,
      start_datetime,
      notes: form.notes
    }).subscribe({
      next: () => {
        this.toast.show('Agendamento atualizado com sucesso!', 'success');
        this.dialogRef.close(true);
        this.isLoading = false;
      },
      error: () => {
        this.toast.show('Erro ao atualizar agendamento.', 'error');
        this.isLoading = false;
      }
    });
  }

  get formControls() {
    return this.appointmentForm.controls;
  }
}