import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarAsistenciaComponent } from './cargar-asistencia.component';

describe('CargarAsistenciaComponent', () => {
  let component: CargarAsistenciaComponent;
  let fixture: ComponentFixture<CargarAsistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarAsistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
