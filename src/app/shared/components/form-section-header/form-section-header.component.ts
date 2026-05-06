import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-form-section-header',
  standalone: true,
  imports: [],
  templateUrl: './form-section-header.component.html',
  styleUrl: './form-section-header.component.scss'
})
export class FormSectionHeaderComponent {
  title = input.required<string>();
  hint = input.required<string>();
}
