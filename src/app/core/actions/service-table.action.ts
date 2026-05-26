import { TableAction } from '../../shared/components/data-table/interfaces/tableAction.interface';

import { IService } from '../interfaces/service.interface';

export const SERVICE_TABLE_ACTIONS:
  TableAction<IService>[] = [
    {
      id: 'view',
      label: 'Visualizar',
      icon: 'visibility',
      color: 'primary',
    },

    {
      id: 'edit',
      label: 'Editar',
      icon: 'edit',
      color: 'accent',
    },

    {
      id: 'delete',
      label: 'Excluir',
      icon: 'delete',
      color: 'warn',
    },
  ];