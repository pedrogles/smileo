import { inject, Injectable } from '@angular/core';
import { IAppointment } from '../../../../core/interfaces/appointment.interface';
import { from, map, Observable } from 'rxjs';
import { CreateAppointmentDTO } from '../../dtos/create-appointment.dto';
import { SupabaseService } from '../../../../core/services/supabase/supabase.service';
import { AppointmentStartDateTime } from '../../../../core/types/appointment.type';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly supabase = inject(SupabaseService);
  
   create(appointmentData: CreateAppointmentDTO): Observable<IAppointment> {
    return from(
      this.supabase.getClient()
      .from('appointments')     
      .insert(appointmentData)
      .select()
      .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);
        return data as IAppointment;
      }
    ));
  }

  getProfessionalAppointmentsByDate(professionalId: string, date: string): Observable<AppointmentStartDateTime[]> {
    const start = `${date}T00:00:00`;
    const end = `${date}T23:59:59`;
    return from(
      this.supabase.getClient()
      .from('appointments')
      .select('start_datetime')
      .eq('professional_id', professionalId)
      .gte('start_datetime', start)
      .lte('start_datetime', end)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);
        return data ? data.map(appointment => appointment.start_datetime) : [];
      })
    );
  }
}
