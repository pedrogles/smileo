import { IMenuItem } from "../interfaces/menu.interface";

export const MENU_ITEMS: IMenuItem[] = [
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
                label: 'Novo Serviço',
                route: '/app/servicos/novo',
            }
        ]
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
                label: 'Serviços',
                route: '/app/gestao/servicos',
            }
        ]
    }
] as const;