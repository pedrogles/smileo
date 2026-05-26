import { Injectable, inject } from '@angular/core';

import {
  from,
  map,
  Observable,
} from 'rxjs';

import { SupabaseService } from '../../../../core/services/supabase/supabase.service';

import { IProfessional } from '../../../../core/interfaces/professional.interface';

import { TableQuery } from '../../../../shared/components/data-table/interfaces/tableQuery.interface';

import { TableResult } from '../../../../shared/components/data-table/interfaces/tableResult.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalManagementService {

  private readonly supabase =
    inject(SupabaseService);

  public findAll(
    query: TableQuery,
  ): Observable<TableResult<IProfessional>> {

    let request = this.supabase
      .getClient()
      .from('professionals')
      .select('*', {
        count: 'exact',
      });

    /*
      SEARCH
    */

    if (query.search?.trim()) {

      const search =
        query.search.trim();

      request = request.or(
        this.buildSearchQuery(search),
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
    professional: IProfessional,
  ): Observable<IProfessional> {

    const request = this.supabase
      .getClient()
      .from('professionals')
      .update({
        name: professional.name,

        birth: professional.birth,

        cpf: professional.cpf,

        phone: professional.phone,

        email: professional.email,

        specialty: professional.specialty,

        cro_number: professional.cro_number,

        cro_state: professional.cro_state,

        is_active: professional.is_active,
      })
      .eq('id', professional.id)
      .select()
      .single();

    return from(request).pipe(
      map(response => response.data),
    );
  }

  public delete(
    professionalId: string,
  ): Observable<void> {

    const request = this.supabase
      .getClient()
      .from('professionals')
      .delete()
      .eq('id', professionalId);

    return from(request).pipe(
      map(() => void 0),
    );
  }

  private buildSearchQuery(
    search: string,
  ): string {

    return [
      `name.ilike.%${search}%`,
      `cpf.ilike.%${search}%`,
      `email.ilike.%${search}%`,
      `phone.ilike.%${search}%`,
    ].join(',');
  }
}