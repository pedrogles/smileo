import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { IMenuItem } from '../../interfaces/menu.interface';
import { MENU_ITEMS } from '../../constants/menu.constant';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIconModule,  
    MatDividerModule,
    RouterLink,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger("openClose", [
      state("open", style({ top: '4rem' })),
      state("close", style({ top: '-25rem' })),
      transition('open => close', [animate('1s ease-in')]),
      transition('close => open', [animate('1s ease-out')])
    ])
  ]
})
export class NavbarComponent {
readonly menuItems: IMenuItem[] = MENU_ITEMS;

  isMenu = false;

  closeMenu(): void {
    this.isMenu = false;
  }
  
  toggleMenu(): void {
    this.isMenu = !this.isMenu;
  };

  onLogout(): void {
    console.log("Logout")
  }
}
