import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../../../../core/services/supabase/supabase.service';
import { from, map, Observable } from 'rxjs';
import { CreatePatientDTO } from '../../dtos/create-patient.dto';
import { IPatient } from '../../../../core/interfaces/patient.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  readonly supabaseService = inject(SupabaseService);

  create(patientData: CreatePatientDTO): Observable<IPatient> {
    return from(
      this.supabaseService.getClient()
      .from('patients')     
      .insert(patientData)
      .select()
      .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);
        return data as IPatient;
      }
    ));
  }
}
