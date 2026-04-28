import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { IMenuItem } from '../../interfaces/menu.interface';
import { MENU_ITEMS } from '../../constants/menu.constant';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatDividerModule,  
    MatIconModule,
    RouterLink,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  readonly menuItems: IMenuItem[] = MENU_ITEMS;

  onLogout(): void {
    console.log('Logout');
  }
}
