import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MENU_ITEMS } from '../../constants/menu.constant';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        SidebarComponent,
        NoopAnimationsModule,
        MatIconModule,
        MatDividerModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo', () => {
    const logo = fixture.nativeElement.querySelector('#medical-logo');
    expect(logo).toBeTruthy();
  });

  it('should render menu items', () => {
    const items = fixture.nativeElement.querySelectorAll('.menu-item');
    expect(items.length).toBe(MENU_ITEMS.length);
  });
});