import { TableAction } from '../../shared/components/data-table/interfaces/tableAction.interface';

import { IAppointment } from '../interfaces/appointment.interface';

export const APPOINTMENT_TABLE_ACTIONS:
  TableAction<IAppointment>[] = [
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