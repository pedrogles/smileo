import { inject, Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { SupabaseService } from '../../../core/services/supabase/supabase.service';
import { DashboardAppointmentTableDTO } from '../dtos/dashboard-appointment-table.dto';
import { AppointmentQueryResponse } from '../../../core/types/appointment.type';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly supabase = inject(SupabaseService);

  getAppointmentsByDate(date: string): Observable<DashboardAppointmentTableDTO[]> {
    const start = `${date}T00:00:00`;
    const end = `${date}T23:59:59`;
    return from(
      this.supabase.getClient()
        .from('appointments')
        .select(`
          id,
          start_datetime,
          status,
          notes,
          patient:patient_id (id, name),
          professional:professional_id (id, name),
          service:service_id (id, name)
        `)
        .gte('start_datetime', start)
        .lte('start_datetime', end)
        .order('start_datetime', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);
        const appointments = (data ?? []) as unknown as AppointmentQueryResponse[];
        return appointments.map((appointment): DashboardAppointmentTableDTO => {
          const { patient, professional, service } = appointment;
          return {
            id: appointment.id,
            patient_id: patient?.id ?? '',
            professional_id: professional?.id ?? '',
            service_id: service?.id ?? '',
            patient_name: patient?.name ?? '-',
            professional_name: professional?.name ?? '-',
            service_name: service?.name ?? '-',
            start_datetime: formatDate(appointment.start_datetime, 'dd/MM/yyyy - HH:mm', 'pt-BR'),
            status: appointment.status,
            notes: appointment.notes
          };
        });
      })
    );
  }

  getNextAppointment(): Observable<DashboardAppointmentTableDTO | null> {
    const now = new Date().toISOString();
    return from(
      this.supabase.getClient()
        .from('appointments')
        .select(`
          id,
          start_datetime,
          status,
          notes,
          patient:patient_id (id, name),
          professional:professional_id (id, name),
          service:service_id (id, name)
        `)
        .in('status', ['scheduled', 'in_progress'])
        .gte('start_datetime', now)
        .order('start_datetime', { ascending: true })
        .limit(1)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) return null;
        const appointment = data as unknown as AppointmentQueryResponse;
        const { patient, professional, service } = appointment;
        return {
          id: appointment.id,
          patient_id: patient?.id ?? '',
          professional_id: professional?.id ?? '',
          service_id: service?.id ?? '',
          patient_name: patient?.name ?? '-',
          professional_name: professional?.name ?? '-',
          service_name: service?.name ?? '-',
          start_datetime: formatDate(appointment.start_datetime, 'dd/MM/yyyy - HH:mm', 'pt-BR'),
          status: appointment.status,
          notes: appointment.notes
        };
      })
    );
  }

  getTotalPatients(): Observable<number> {
    return from(
      this.supabase.getClient()
        .from('patients')
        .select('*', { count: 'exact', head: true })
    ).pipe(
      map(({ count, error }) => {
        if (error) throw new Error(error.message);
        return count ?? 0;
      })
    );
  }

  getTotalProfessionals(): Observable<number> {
    return from(
      this.supabase.getClient()
        .from('professionals')
        .select('*', { count: 'exact', head: true })
    ).pipe(
      map(({ count, error }) => {
        if (error) throw new Error(error.message);
        return count ?? 0;
      })
    );
  }

  getTotalAppointmentsToday(): Observable<number> {
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    const start = `${today}T00:00:00`;
    const end = `${today}T23:59:59`;
    return from(
      this.supabase.getClient()
        .from('appointments')
        .select('*', { count: 'exact', head: true })
        .gte('start_datetime', start)
        .lte('start_datetime', end)
    ).pipe(
      map(({ count, error }) => {
        if (error) throw new Error(error.message);
        return count ?? 0;
      })
    );
  }
}