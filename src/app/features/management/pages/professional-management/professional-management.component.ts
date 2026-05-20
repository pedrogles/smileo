import { Component } from '@angular/core';
import { ProfessionalManagementTableComponent } from './components/professional-management-table/professional-management-table.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-professional-management',
  standalone: true,
  imports: [
    ProfessionalManagementTableComponent,
    PageHeaderComponent
  ],
  templateUrl: './professional-management.component.html',
  styleUrl: './professional-management.component.scss'
})
export class ProfessionalManagementComponent {

}