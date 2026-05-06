import { Component, inject, input } from '@angular/core';
import { DataTableComponent } from '../../../../../../shared/components/data-table/data-table.component';
import { PatientManagementService } from '../../../../services/patient-management.service';
import { IPatient } from '../../../../../../core/interfaces/patient.interface';
import { ColumnsConfigType } from '../../../../../../core/types/columnsConfig.type';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-patient-management-table',
  standalone: true,
  imports: [
    DataTableComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './patient-management-table.component.html',
  styleUrl: './patient-management-table.component.scss'
})
export class PatientManagementTableComponent {
  patients: IPatient[] = [];
  columnsConfig: ColumnsConfigType[] = [
    { value: 'Name', column: 'name', type: 'text' },
    { value: 'Data de Nascimento', column: 'birth', type: 'text' },
    { value: 'Phone', column: 'phone', type: 'text' },
    { value: 'Email', column: 'email', type: 'text' },
    { value: 'Alergias', column: 'has_allergies', type: 'boolean' },
    { value: 'Obs.', column: 'allergies_notes', type: 'text' },
    { value: 'Condições Médicas', column: 'has_medical_conditions', type: 'boolean' },
    { value: 'Obs.', column: 'medical_conditions_notes', type: 'text' }
  ];

  isLoading = true;

  readonly patientManagementService = inject(PatientManagementService);

  ngOnInit() {
    this.patientManagementService.getAll().subscribe(patients => {
      this.patients = patients;
      this.isLoading = false;
    });
  }
}
