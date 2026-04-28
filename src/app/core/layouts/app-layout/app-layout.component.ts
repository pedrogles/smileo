import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Subject, takeUntil } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavbarComponent, 
    SidebarComponent
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent {
  isMobile!: boolean;
  
  private destroy$ = new Subject<void>();
  private readonly breakpointObserver = inject(BreakpointObserver);

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 1023px)'])
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.isMobile = value.matches;
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
