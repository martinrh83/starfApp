import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CiclosLectivosService } from '../app/services/ciclos-lectivos.service';
import { HomeComponent } from './components/home/home.component';
import { CiclosLectivosComponent } from './components/ciclos-lectivos/ciclos-lectivos.component';
import { CicloLectivoComponent } from './components/ciclos-lectivos/ciclo-lectivo.component';
import { NivelesComponent } from './components/niveles/niveles.component';
import { NivelComponent } from './components/niveles/nivel.component';
import { MateriasComponent } from './components/materias/materias.component';
import { MateriaComponent } from './components/materias/materia.component';
import { ComisionesComponent } from './components/comisiones/comisiones.component';
import { ComisionComponent } from './components/comisiones/comision.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { HorariosComponent } from './components/horarios/horarios.component';
import { HorarioComponent } from './components/horarios/horario.component';
import { HorariosComisionComponent } from './components/horarios/horarios-comision.component';

export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'ciclos-lectivos', component: CiclosLectivosComponent},
    { path: 'ciclo-lectivo/new', component: CicloLectivoComponent},
    { path: 'niveles', component: NivelesComponent},
    { path: 'nivel/new', component: NivelComponent},
    { path: 'materias', component: MateriasComponent},
    { path: 'materia/new', component: MateriaComponent},
    { path: 'comisiones', component: ComisionesComponent},
    { path: 'comision/new', component: ComisionComponent},
    { path: 'alumnos', component: AlumnosComponent},
    { path: 'horarios', component: HorariosComponent},
    { path: 'horarios/:com_id', component: HorariosComisionComponent},
    { path: 'horario/new/:com_id', component: HorarioComponent},



]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);