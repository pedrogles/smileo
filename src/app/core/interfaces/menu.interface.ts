import { MenuItemType, MenuSubItem } from "../types/menu.type";

export interface IMenuItem {
    key: string;
    label: string;
    route?: string;
    icon?: string;
    type: MenuItemType;
    children?: MenuSubItem[];
}