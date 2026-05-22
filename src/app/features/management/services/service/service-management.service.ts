import { Injectable, inject } from '@angular/core';

import {
  from,
  map,
  Observable,
} from 'rxjs';

import { SupabaseService } from '../../../../core/services/supabase/supabase.service';

import { IService } from '../../../../core/interfaces/service.interface';

import { TableQuery } from '../../../../shared/components/data-table/interfaces/tableQuery.interface';

import { TableResult } from '../../../../shared/components/data-table/interfaces/tableResult.interface';

@Injectable({
  providedIn: 'root',
})
export class ServiceManagementService {

  private readonly supabase =
    inject(SupabaseService);

  public findAll(
    query: TableQuery,
  ): Observable<TableResult<IService>> {

    let request = this.supabase
      .getClient()
      .from('services')
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
    service: IService,
  ): Observable<IService> {

    const request = this.supabase
      .getClient()
      .from('services')
      .update({
        name: service.name,

        description:
          service.description,

        duration_minutes:
          service.duration_minutes,

        price: service.price,
      })
      .eq('id', service.id)
      .select()
      .single();

    return from(request).pipe(
      map(response => response.data),
    );
  }

  public delete(
    serviceId: string,
  ): Observable<void> {

    const request = this.supabase
      .getClient()
      .from('services')
      .delete()
      .eq('id', serviceId);

    return from(request).pipe(
      map(() => void 0),
    );
  }

  private buildSearchQuery(
    search: string,
  ): string {

    return [
      `name.ilike.%${search}%`,
      `description.ilike.%${search}%`,
    ].join(',');
  }
}