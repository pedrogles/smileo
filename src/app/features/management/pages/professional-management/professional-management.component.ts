import { Component } from '@angular/core';
import { ProfessionalManagementTableComponent } from './components/professional-management-table/professional-management-table.component';

@Component({
  selector: 'app-professional-management',
  standalone: true,
  imports: [ProfessionalManagementTableComponent],
  templateUrl: './professional-management.component.html',
  styleUrl: './professional-management.component.scss'
})
export class ProfessionalManagementComponent {

}