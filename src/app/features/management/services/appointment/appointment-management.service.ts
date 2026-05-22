import { Injectable, inject } from '@angular/core';

import {
  from,
  map,
  Observable,
} from 'rxjs';

import { SupabaseService } from '../../../../core/services/supabase/supabase.service';

import { IAppointment } from '../../../../core/interfaces/appointment.interface';

import { TableQuery } from '../../../../shared/components/data-table/interfaces/tableQuery.interface';

import { TableResult } from '../../../../shared/components/data-table/interfaces/tableResult.interface';

@Injectable({
  providedIn: 'root',
})
export class AppointmentManagementService {

  private readonly supabase =
    inject(SupabaseService);

  public findAll(
    query: TableQuery,
  ): Observable<TableResult<IAppointment>> {

    let request = this.supabase
      .getClient()
      .from('appointments')
      .select(`
        *,
        patient:patients(
          id,
          name
        ),
        professional:professionals(
          id,
          name
        ),
        service:services(
          id,
          name
        )
      `, {
        count: 'exact',
      });

    /*
      SEARCH
    */

    if (query.search?.trim()) {

      const search =
        query.search.trim();

      request = request.or(
        `
          notes.ilike.%${search}%
        `
          .replace(/\s/g, ''),
      );
    }

    /*
      SORT
    */

    if (
      query.sortField &&
      query.sortDirection
    ) {

      request = request.order(
        query.sortField,
        {
          ascending:
            query.sortDirection === 'asc',
        },
      );
    }

    /*
      PAGINATION
    */

    request = request.range(
      query.pageIndex * query.pageSize,

      (
        query.pageIndex *
        query.pageSize
      ) + query.pageSize - 1,
    );

    return from(request).pipe(
      map(response => ({
        data: response.data ?? [],

        total: response.count ?? 0,
      })),
    );
  }

  public update(
    appointment: IAppointment,
  ): Observable<IAppointment> {

    const request = this.supabase
      .getClient()
      .from('appointments')
      .update({
        patient_id:
          appointment.patient_id,

        professional_id:
          appointment.professional_id,

        service_id:
          appointment.service_id,

        start_datetime:
          appointment.start_datetime,

        notes:
          appointment.notes,

        status:
          appointment.status,
      })
      .eq('id', appointment.id)
      .select(`
        *,
        patient:patients(
          id,
          name
        ),
        professional:professionals(
          id,
          name
        ),
        service:services(
          id,
          name
        )
      `)
      .single();

    return from(request).pipe(
      map(response => response.data),
    );
  }

  public delete(
    appointmentId: string,
  ): Observable<void> {

    const request = this.supabase
      .getClient()
      .from('appointments')
      .delete()
      .eq('id', appointmentId);

    return from(request).pipe(
      map(() => void 0),
    );
  }
}