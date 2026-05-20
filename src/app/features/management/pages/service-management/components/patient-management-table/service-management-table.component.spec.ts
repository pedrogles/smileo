import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceManagementTableComponent } from './service-management-table.component';

describe('ServiceManagementTableComponent', () => {
  let component: ServiceManagementTableComponent;
  let fixture: ComponentFixture<ServiceManagementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceManagementTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
