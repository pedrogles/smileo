import { Component, inject } from '@angular/core';
import { DataTableComponent } from '../../../../../../shared/components/data-table/data-table.component';
import { ProfessionalManagementService } from '../../../../services/professional-management.service';
import { IProfessional } from '../../../../../../core/interfaces/professional.interface';
import { ColumnsConfigType } from '../../../../../../core/types/columnsConfig.type';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-professional-management-table',
  standalone: true,
  imports: [
    DataTableComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './professional-management-table.component.html',
  styleUrl: './professional-management-table.component.scss'
})
export class ProfessionalManagementTableComponent {
  professionals: IProfessional[] = [];
  columnsConfig: ColumnsConfigType[] = [
    { value: 'Nome', column: 'name', type: 'text' },
    { value: 'Data de Nascimento', column: 'birth', type: 'text' },
    { value: 'Telefone', column: 'phone', type: 'text' },
    { value: 'Email', column: 'email', type: 'text' },
    { value: 'Especialidade', column: 'speciality', type: 'text' },
    { value: 'CRO', column: 'cro_number', type: 'text' },
    { value: 'Estado CRO', column: 'cro_state', type: 'boolean' },
    { value: 'Ativo', column: 'is_active', type: 'boolean' }
  ];

  isLoading = true;

  readonly professionalManagementService = inject(ProfessionalManagementService);

  ngOnInit() {
    this.professionalManagementService.getAll().subscribe(professionals => {
      this.professionals = professionals;
      this.isLoading = false;
    });
  }
}