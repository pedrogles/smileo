import { IMenuItem } from "../interfaces/menu.interface";

export const MENU_ITEMS: IMenuItem[] = [
    { 
        key: 'dashboard',
        label: 'Dashboard', 
        icon: 'dashboard',
        type: 'link',
        route: '/app/dashboard'
    },
    { 
        key: 'cadastros',
        label: 'Cadastros', 
        icon: 'group_add',
        type: 'submenu',
        children: [
            {
                label: 'Novo Paciente',
                route: '/app/pacientes/novo',
            },
            {
                label: 'Novo Profissional',
                route: '/app/profissionais/novo',
            },
            {
                label: 'Novo Serviço',
                route: '/app/servicos/novo'
            }
        ]
    },
    { 
        key: 'agendamento',
        label: 'Agendamento', 
        icon: 'calendar_today',
        type: 'link',
        route: '/app/agendamentos/novo'
    },
    { 
        key: 'gestao',
        label: 'Gestão', 
        icon: 'admin_panel_settings',
        type: 'submenu',
        children: [
            {
                label: 'Pacientes',
                route: '/app/gestao/pacientes',
            },
            {
                label: 'Profissionais',
                route: '/app/gestao/profissionais',
            },
            {
                label: 'Serviços',
                route: '/app/gestao/servicos'
            },
            {
                label: 'Agendamentos',
                route: '/app/gestao/agendamentos'
            }
        ]
    }
] as const;