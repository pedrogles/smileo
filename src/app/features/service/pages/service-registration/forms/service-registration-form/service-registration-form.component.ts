import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormSectionHeaderComponent } from '../../../../../../shared/components/form-section-header/form-section-header.component';
import { CreateServiceDTO } from '../../../../dtos/create-service.dto';
import { ServiceFormType } from '../../../../../../core/types/serviceForm.type';
import { ServiceService } from '../../../../services/service.service';
import { ToastService } from '../../../../../../core/services/toast/toast.service';

@Component({
  selector: 'app-service-registration-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCheckboxModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    FormSectionHeaderComponent
  ],
  templateUrl: './service-registration-form.component.html',
  styleUrl: './service-registration-form.component.scss'
})
export class ServiceRegistrationFormComponent {
  serviceForm!: FormGroup<ServiceFormType>;

  isLoading = false;

  private readonly formBuilder = inject(FormBuilder);
  private readonly serviceService = inject(ServiceService);
  private readonly toastService = inject(ToastService);

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.serviceForm = this.formBuilder.group<ServiceFormType>({
      name: new FormControl<string>('', { 
        nonNullable: true, 
        validators: [Validators.required, Validators.minLength(6)] 
      }),
      description: new FormControl<string>('', { 
        nonNullable: true, 
        validators: [Validators.required, Validators.minLength(10)] 
      }),
      durationMinutes: new FormControl<number>(0, { 
        nonNullable: true, 
        validators: [Validators.required, Validators.min(1)] 
      }),
      price: new FormControl<number>(0, { 
        nonNullable: true, 
        validators: [Validators.required, Validators.min(0)] 
      })
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    const serviceData: CreateServiceDTO = this.buildCreateServiceDTO();
    console.log('Service Data to be submitted:', serviceData);
    this.serviceService.create(serviceData).subscribe({
      next: (createdService) => {
        this.toastService.show(`Serviço "${createdService.name}" cadastrado(a) com sucesso!`, 'success');
        this.serviceForm.reset();
        this.isLoading = false;
      },
        error: (error) => {
          console.error('Error creating service:', error);
          this.toastService.show('Ocorreu um erro ao cadastrar o serviço. Por favor, tente novamente.', 'error');
          this.isLoading = false;
        }
    });
  }

  private buildCreateServiceDTO(): CreateServiceDTO {
    const formValue = this.serviceForm.getRawValue();
    return {
      name: formValue.name,
      description: formValue.description,
      duration_minutes: formValue.durationMinutes,
      price: formValue.price
    };
  }


  get form(): FormGroup<ServiceFormType> {
      return this.serviceForm as FormGroup;
  }
}
