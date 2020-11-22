import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarExcepcionComponent } from './cargar-excepcion.component';

describe('CargarExcepcionComponent', () => {
  let component: CargarExcepcionComponent;
  let fixture: ComponentFixture<CargarExcepcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarExcepcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarExcepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
