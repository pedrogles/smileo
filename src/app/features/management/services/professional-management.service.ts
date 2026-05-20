import { inject, Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { SupabaseService } from '../../../core/services/supabase/supabase.service';
import { IProfessional } from '../../../core/interfaces/professional.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalManagementService {
  readonly supabaseService = inject(SupabaseService);

  getAll(): Observable<IProfessional[]> {
    return from(
      this.supabaseService.getClient()
        .from('professionals')
        .select('*')
    ).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);
        return data ?? [];
      })
    );
  }
}