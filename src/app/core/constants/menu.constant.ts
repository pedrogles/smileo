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
                label: 'Novo Profissional',
                route: '/app/profissionais/novo',
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
                label: 'Profissionais',
                route: '/app/gestao/profissionais',
            }
        ]
    }
] as const;