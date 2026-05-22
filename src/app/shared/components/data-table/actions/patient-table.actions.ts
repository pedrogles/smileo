import { TableAction } from '../../../../shared/components/data-table/interfaces/tableAction.interface';

import { IPatient } from '../../../../core/interfaces/patient.interface';

export const PATIENT_TABLE_ACTIONS: TableAction<IPatient>[] = [
  {
    id: 'view',

    label: 'Visualizar',

    icon: 'visibility',

    tooltip: 'Visualizar paciente',
  },

  {
    id: 'edit',

    label: 'Editar',

    icon: 'edit',

    tooltip: 'Editar paciente',
  },

  {
    id: 'delete',

    label: 'Excluir',

    icon: 'delete',

    color: 'warn',

    tooltip: 'Excluir paciente',
  },
];