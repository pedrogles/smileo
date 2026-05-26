import { TableColumn } from '../../shared/components/data-table/interfaces/tableColumn.interface';
import { IProfessional } from '../interfaces/professional.interface';

export const PROFESSIONAL_TABLE_COLUMNS:
  TableColumn<IProfessional>[] = [
    {
      key: 'name',

      label: 'Nome',

      type: 'text',

      sortable: true,
    },

    {
      key: 'specialty',

      label: 'Especialidade',

      type: 'badge',

      sortable: true,
    },

    {
      key: 'cro_number',

      label: 'CRO',

      type: 'text',
    },

    {
      key: 'cro_state',

      label: 'UF',

      type: 'text',

      align: 'center',
    },

    {
      key: 'phone',

      label: 'Telefone',

      type: 'text',
    },

    {
      key: 'email',

      label: 'E-mail',

      type: 'text',
    },

    {
      key: 'is_active',

      label: 'Status',

      type: 'boolean',

      align: 'center',

      formatter: professional =>
        professional.is_active
          ? 'Ativo'
          : 'Inativo',
    },
  ];