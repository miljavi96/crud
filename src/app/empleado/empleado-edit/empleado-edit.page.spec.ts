import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpleadoEditPage } from './empleado-edit.page';

describe('EmpleadoEditPage', () => {
  let component: EmpleadoEditPage;
  let fixture: ComponentFixture<EmpleadoEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
