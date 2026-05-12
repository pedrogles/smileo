import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../../../../core/services/supabase/supabase.service';
import { from, map, Observable } from 'rxjs';
import { CreateProfessionalDTO } from '../../dtos/create-professional.dto';
import { IProfessional } from '../../../../core/interfaces/professional.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {
  readonly supabaseService = inject(SupabaseService);

  create(professionalData: CreateProfessionalDTO): Observable<IProfessional> {
    return from(
      this.supabaseService.getClient()
      .from('professionals')     
      .insert(professionalData)
      .select()
      .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);
        return data as IProfessional;
      }
    ));
  }
}