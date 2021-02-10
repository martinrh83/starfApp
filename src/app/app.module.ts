
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MatAutocompleteModule, MatInputModule, MatStepperModule, MatIconModule, MatProgressBarModule, MatListModule, MatDividerModule, MatTableModule, MatDatepickerModule, MatCardModule, MatSnackBarModule} from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS,MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { routes } from './app.routes';
import { DatePipe, registerLocaleData } from '@angular/common';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
registerLocaleData(localeEs, localeEsExtra);

//services
import { CiclosLectivosService } from './services/ciclos-lectivos.service';
import { NivelesService } from './services/niveles.service';
import { MateriasService } from './services/materias.service';
import { ComisionesService } from './services/comisiones.service';
import { AulasService } from './services/aulas.service';
import { AlumnosService } from './services/alumnos.service';
import { HorariosService } from './services/horarios.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { DataService } from './services/socket.service';
import { StarfService } from './services/starf.service';

//components
import { AppComponent } from './app.component';
import { CiclosLectivosComponent } from './components/ciclos-lectivos/ciclos-lectivos.component';
import { CicloLectivoComponent } from './components/ciclos-lectivos/ciclo-lectivo.component';
import { NivelesComponent } from './components/niveles/niveles.component';
import { NivelComponent } from './components/niveles/nivel.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { MateriasComponent } from './components/materias/materias.component';
import { MateriaComponent } from './components/materias/materia.component';
import { ComisionesComponent } from './components/comisiones/comisiones.component';
import { ComisionComponent } from './components/comisiones/comision.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { AulasComponent } from './components/aulas/aulas.component';
import { HorariosComponent } from './components/horarios/horarios.component';
import { HorarioComponent } from './components/horarios/horario.component';
import { HorariosComisionComponent } from './components/horarios/horarios-comision.component';
import { CalendarComponent } from './components/horarios/calendar.component';
import { TimetableComponent } from './components/horarios/timetable.component';
import { TimetablesComponent } from './components/horarios/timetables.component';
import { AdminHorarioComponent } from './components/horarios/admin-horario.component'



// the second parameter 'fr' is optional
//pipes
import { KeysPipe } from './pipes/keys.pipe';
import { AsistenciasComponent } from './components/asistencias/asistencias.component';
import { CargarAsistenciaComponent } from './components/asistencias/cargar-asistencia.component';
import { CargarExcepcionComponent } from './components/asistencias/cargar-excepcion.component';

@NgModule({
  declarations: [
    AppComponent,
    CiclosLectivosComponent,
    CicloLectivoComponent,
    HomeComponent,
    NavbarComponent,
    KeysPipe,
    NivelesComponent,
    NivelComponent,
    MateriasComponent,
    MateriaComponent,
    ComisionesComponent,
    ComisionComponent,
    AlumnosComponent,
    HorariosComponent,
    HorarioComponent,
    HorariosComisionComponent,
    TimetableComponent,
    TimetablesComponent,
    CalendarComponent,
    AulasComponent,
    AdminHorarioComponent,
    AsistenciasComponent,
    CargarAsistenciaComponent,
    CargarExcepcionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatStepperModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatDividerModule,
    MatDatepickerModule,
    MatTableModule,
    MatCardModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    routes,
    AmazingTimePickerModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-AR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    CiclosLectivosService,
    NivelesService,
    MateriasService,
    ComisionesService,
    AulasService,
    AlumnosService,
    HorariosService,
    AuthService,
    AuthGuardService,
    DataService,
    StarfService,
    DatePipe
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
