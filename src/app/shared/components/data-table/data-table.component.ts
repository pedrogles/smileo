import { Component, input } from '@angular/core';
import { ColumnsConfigType } from '../../../core/types/columnsConfig.type';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {
  dataSource = input.required<any[]>();
  columnsConfig = input.required<ColumnsConfigType[]>();
}
