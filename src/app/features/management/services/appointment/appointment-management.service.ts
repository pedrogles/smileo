import { inject, Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { SupabaseService } from '../../../../core/services/supabase/supabase.service';
import { AppointmentTableDTO } from '../../dtos/appointment-table.dto';
import { formatDate } from '@angular/common';
import { AppointmentQueryResponse } from '../../../../core/types/appointment.type';

@Injectable({
  providedIn: 'root'
})
export class AppointmentManagementService {
  readonly supabaseService = inject(SupabaseService);

  getAll(): Observable<AppointmentTableDTO[]> {
  return from(
    this.supabaseService
      .getClient()
      .from('appointments')
      .select(`
        id,
        start_datetime,
        status,
        notes,

        patient:patient_id (
          id,
          name
        ),

        professional:professional_id (
          id,
          name
        ),

        service:service_id (
          id,
          name
        )
      `)
  ).pipe(
    map(({ data, error }) => {
      if (error) {
        throw new Error(error.message);
      }

      const appointments =
        (data ?? []) as unknown as AppointmentQueryResponse[];

      return appointments.map(
        (appointment): AppointmentTableDTO => {
          const {
            patient,
            professional,
            service
          } = appointment;

          return {
            id: appointment.id,

            patient_id: patient?.id ?? '',
            professional_id: professional?.id ?? '',
            service_id: service?.id ?? '',

            patient_name: patient?.name ?? '-',

            professional_name:
              professional?.name ?? '-',

            service_name:
              service?.name ?? '-',

            start_datetime: formatDate(
              appointment.start_datetime,
              'dd/MM/yyyy - HH:mm',
              'pt-BR'
            ),

            status: appointment.status,

            notes: appointment.notes
          };
        }
      );
    })
  );
}
}
