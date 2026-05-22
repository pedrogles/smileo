import { TableColumn } from '../../shared/components/data-table/interfaces/tableColumn.interface';

import { IPatient } from '../interfaces/patient.interface';

export const PATIENT_TABLE_COLUMNS:
  TableColumn<IPatient>[] = [
    {
      key: 'name',

      label: 'Nome',

      type: 'text',

      sortable: true,
    },

    {
      key: 'cpf',

      label: 'CPF',

      type: 'text',

      sortable: true,
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
      key: 'has_allergies',

      label: 'Alergias',

      type: 'boolean',

      align: 'center',

      formatter: (
        patient,
      ): string =>

        patient.has_allergies
          ? 'Sim'
          : 'Não',
    },

    {
      key: 'has_medical_conditions',

      label: 'Comorbidades',

      type: 'boolean',

      align: 'center',

      formatter: (
        patient,
      ): string =>

        patient.has_medical_conditions
          ? 'Sim'
          : 'Não',
    },
  ];