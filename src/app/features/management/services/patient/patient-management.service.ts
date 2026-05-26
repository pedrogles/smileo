import { Injectable, inject } from '@angular/core';

import {
  from,
  map,
  Observable,
} from 'rxjs';

import { SupabaseService } from '../../../../core/services/supabase/supabase.service';

import { IPatient } from '../../../../core/interfaces/patient.interface';

import { TableQuery } from '../../../../shared/components/data-table/interfaces/tableQuery.interface';

import { TableResult } from '../../../../shared/components/data-table/interfaces/tableResult.interface';

@Injectable({
  providedIn: 'root',
})
export class PatientManagementService {

  private readonly supabase =
    inject(SupabaseService);

  public findAll(
    query: TableQuery,
  ): Observable<TableResult<IPatient>> {

    let request = this.supabase
      .getClient()
      .from('patients')
      .select('*', {
        count: 'exact',
      });

    /*
      SEARCH
    */

    if (query.search?.trim()) {

      const search = query.search.trim();

      request = request.or(
        `name.ilike.%${search}%,cpf.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`,
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
    patient: IPatient,
  ): Observable<IPatient> {

    const request = this.supabase
      .getClient()
      .from('patients')
      .update({
        name: patient.name,

        phone: patient.phone,

        email: patient.email,

        has_allergies:
          patient.has_allergies,

        allergies_notes:
          patient.allergies_notes,

        has_medical_conditions:
          patient.has_medical_conditions,

        medical_conditions_notes:
          patient.medical_conditions_notes,
      })
      .eq('id', patient.id)
      .select()
      .single();

    return from(request).pipe(
      map(response => response.data),
    );
  }

  public delete(
    patientId: string,
  ): Observable<void> {

    const request = this.supabase
      .getClient()
      .from('patients')
      .delete()
      .eq('id', patientId);

    return from(request).pipe(
      map(() => void 0),
    );
  }
}