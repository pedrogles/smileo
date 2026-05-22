import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceViewDialogComponent } from './service-view-dialog.component';

describe('ServiceViewDialogComponent', () => {
  let component: ServiceViewDialogComponent;
  let fixture: ComponentFixture<ServiceViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceViewDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
