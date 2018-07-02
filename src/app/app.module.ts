
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID} from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { routes } from './app.routes';
import { DatePipe, registerLocaleData } from '@angular/common';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';

registerLocaleData(localeEs, localeEsExtra);

//services
import { CiclosLectivosService } from './services/ciclos-lectivos.service';
import { NivelesService } from './services/niveles.service';
import { MateriasService } from './services/materias.service';
import { ComisionesService } from './services/comisiones.service';
import { AlumnosService } from './services/alumnos.service';
import { HorariosService } from './services/horarios.service';
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
import { HorariosComponent } from './components/horarios/horarios.component';
import { HorarioComponent } from './components/horarios/horario.component';
import { HorariosComisionComponent } from './components/horarios/horarios-comision.component';



// the second parameter 'fr' is optional
//pipes
import { KeysPipe } from './pipes/keys.pipe';
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
    HorariosComisionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    routes,
    AmazingTimePickerModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-AR'},
    CiclosLectivosService,
    NivelesService,
    MateriasService,
    ComisionesService,
    AlumnosService,
    HorariosService,
    DatePipe
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
