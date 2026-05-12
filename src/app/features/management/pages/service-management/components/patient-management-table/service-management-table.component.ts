import { Component, inject } from '@angular/core';
import { DataTableComponent } from '../../../../../../shared/components/data-table/data-table.component';
import { ServiceManagementService } from '../../../../services/service/service-management.service';
import { ColumnsConfigType } from '../../../../../../core/types/columnsConfig.type';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IService } from '../../../../../../core/interfaces/service.interface';

@Component({
  selector: 'app-service-management-table',
  standalone: true,
  imports: [
    DataTableComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './service-management-table.component.html',
  styleUrl: './service-management-table.component.scss'
})
export class ServiceManagementTableComponent {
  services: IService[] = [];
  columnsConfig: ColumnsConfigType[] = [
    { value: 'Nome', column: 'name', type: 'text' },
    { value: 'Descrição', column: 'description', type: 'text' },
    { value: 'Tempo de duração', column: 'duration_minutes', type: 'minutes' },
    { value: 'Valor', column: 'price', type: 'price' }
  ];

  isLoading = true;

  readonly serviceManagementService = inject(ServiceManagementService);

  ngOnInit() {
    this.serviceManagementService.getAll().subscribe(services => {
      this.services = services;
      this.isLoading = false;
    });
  }
}
