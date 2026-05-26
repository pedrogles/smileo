import { TableAction } from "../../shared/components/data-table/interfaces/tableAction.interface";
import { IProfessional } from "../interfaces/professional.interface";

export const PROFESSIONAL_TABLE_ACTIONS:
  TableAction<IProfessional>[] = [
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