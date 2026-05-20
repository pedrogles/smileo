import { inject, Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { SupabaseService } from '../../../../core/services/supabase/supabase.service';
import { IService } from '../../../../core/interfaces/service.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceManagementService {
  readonly supabaseService = inject(SupabaseService);

  getAll(): Observable<IService[]> {
    return from(
      this.supabaseService.getClient()
        .from('services')
        .select('*')
    ).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);
        return data ?? [];
      })
    );
  }
}
