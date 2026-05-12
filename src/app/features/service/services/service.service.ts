import { inject, Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { CreateServiceDTO } from '../dtos/create-service.dto';
import { SupabaseService } from '../../../core/services/supabase/supabase.service';
import { IService } from '../../../core/interfaces/service.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  readonly supabaseService = inject(SupabaseService);

  create(serviceData: CreateServiceDTO): Observable<IService> {
    return from(
      this.supabaseService.getClient()
      .from('services')     
      .insert(serviceData)
      .select()
      .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);
        return data as IService;
      }
    ));
  }
}
