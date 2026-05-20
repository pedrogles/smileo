import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  template: `
    <main>
      <h1>Dashboard</h1>
      <p class="projected-content">Projected content</p>
    </main>
  `
})
class TestHostComponent {}

describe('AppLayoutComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should render the title', () => {
    const titleEl = fixture.debugElement.query(By.css('h1'));
    expect(titleEl.nativeElement.textContent.trim()).toBe('Dashboard');
  });

  it('should project content via ng-content', () => {
    const projectedEl = fixture.debugElement.query(By.css('.projected-content'));
    expect(projectedEl).toBeTruthy();
    expect(projectedEl.nativeElement.textContent.trim()).toBe('Projected content');
  });
});