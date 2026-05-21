import { Component, input } from '@angular/core';
import { ColumnsConfigType } from '../../../core/types/columnsConfig.type';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {
  dataSource = input.required<any[]>();
  columnsConfig = input.required<ColumnsConfigType[]>();
}