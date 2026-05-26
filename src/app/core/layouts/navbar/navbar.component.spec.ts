import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MENU_ITEMS } from '../../constants/menu.constant';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        NoopAnimationsModule,
        MatIconModule,
        MatDividerModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
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

    it('should render menu button initially', () => {
      const button = fixture.nativeElement.querySelector('.menu-btn');
      expect(button).toBeTruthy();
    });

    it('should toggle menu state when clicking button', () => {
      const button = fixture.nativeElement.querySelector('.menu-btn');
      button.click();
      fixture.detectChanges();
      expect(component.isMenu).toBeTrue();
    });

    it('should render menu items when menu is open', () => {
      component.isMenu = true;
      fixture.detectChanges();
      const items = fixture.nativeElement.querySelectorAll('.menu-item');
      expect(items.length).toBe(MENU_ITEMS.length);
    });
});