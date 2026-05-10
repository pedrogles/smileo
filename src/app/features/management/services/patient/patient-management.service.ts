import { inject, Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { SupabaseService } from '../../../../core/services/supabase/supabase.service';
import { IPatient } from '../../../../core/interfaces/patient.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientManagementService {
  readonly supabaseService = inject(SupabaseService);

  getAll(): Observable<IPatient[]> {
    return from(
      this.supabaseService.getClient()
        .from('patients')
        .select('*')
    ).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);
        return data ?? [];
      })
    );
  }
}
