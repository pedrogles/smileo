import { TableColumn } from '../../shared/components/data-table/interfaces/tableColumn.interface';

import { IService } from '../interfaces/service.interface';

export const SERVICE_TABLE_COLUMNS:
  TableColumn<IService>[] = [
    {
      key: 'name',
      label: 'Serviço',
      type: 'text',
      sortable: true,
    },

    {
      key: 'description',
      label: 'Descrição',
      type: 'text',
    },

    {
      key: 'duration_minutes',
      label: 'Duração',
      type: 'minutes',
      sortable: true,
      align: 'center',
      formatter: service =>
        `${service.duration_minutes} min`,
    },

    {
      key: 'price',
      label: 'Preço',
      type: 'currency',
      sortable: true,
      align: 'right',
      formatter: service =>
        new Intl.NumberFormat(
          'pt-BR',
          {
            style: 'currency',
            currency: 'BRL',
          },
        ).format(service.price),
    },
  ];