import { TableColumn } from '../../shared/components/data-table/interfaces/tableColumn.interface';

import { IAppointment } from '../interfaces/appointment.interface';

export const APPOINTMENT_TABLE_COLUMNS:
  TableColumn<IAppointment>[] = [
    {
      key: 'patient',

      label: 'Paciente',

      type: 'text',

      sortable: true,

      formatter: appointment =>
        appointment.patient?.name ??
        '-',
    },

    {
      key: 'professional',

      label: 'Profissional',

      type: 'text',

      sortable: true,

      formatter: appointment =>
        appointment.professional?.name ??
        '-',
    },

    {
      key: 'service',

      label: 'Serviço',

      type: 'text',

      formatter: appointment =>
        appointment.service?.name ??
        '-',
    },

    {
      key: 'start_datetime',

      label: 'Data/Hora',

      type: 'datetime',

      sortable: true,

      formatter: appointment =>
        new Intl.DateTimeFormat(
          'pt-BR',
          {
            dateStyle: 'short',
            timeStyle: 'short',
          },
        ).format(
          new Date(
            appointment.start_datetime,
          ),
        ),
    },

    {
      key: 'status',

      label: 'Status',

      type: 'badge',

      align: 'center',

      formatter: appointment => {

        switch (
          appointment.status
        ) {

          case 'scheduled':
            return 'Agendado';

          case 'in_progress':
            return 'Em atendimento';

          case 'completed':
            return 'Concluído';

          case 'canceled':
            return 'Cancelado';

          default:
            return '-';
        }
      },
    },
  ];