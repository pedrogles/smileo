export interface TableQuery {
  pageIndex: number;
  pageSize: number;

  sortField?: string;
  sortDirection?: 'asc' | 'desc' | '';

  search?: string;
}