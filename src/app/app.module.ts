import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { routes } from './app.routes';
//services
import { CiclosLectivosService } from './services/ciclos-lectivos.service';
import { NivelesService } from './services/niveles.service';
import { MateriasService } from './services/materias.service';
import { ComisionesService } from './services/comisiones.service';
import { AlumnosService } from './services/alumnos.service';
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
    AlumnosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [
    CiclosLectivosService,
    NivelesService,
    MateriasService,
    ComisionesService,
    AlumnosService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
