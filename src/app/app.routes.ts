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

import { AuthGuardService } from './services/auth-guard.service';

export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'ciclos-lectivos', component: CiclosLectivosComponent, canActivate: [AuthGuardService]},
    { path: 'ciclo-lectivo/new', component: CicloLectivoComponent, canActivate: [AuthGuardService]},
    { path: 'niveles', component: NivelesComponent, canActivate: [AuthGuardService]},
    { path: 'nivel/new', component: NivelComponent, canActivate: [AuthGuardService]},
    { path: 'materias', component: MateriasComponent, canActivate: [AuthGuardService]},
    { path: 'materia/new', component: MateriaComponent, canActivate: [AuthGuardService]},
    { path: 'comisiones', component: ComisionesComponent, canActivate: [AuthGuardService]},
    { path: 'comision/new', component: ComisionComponent, canActivate: [AuthGuardService]},
    { path: 'alumnos', component: AlumnosComponent, canActivate: [AuthGuardService]},
    { path: 'horarios', component: HorariosComponent, canActivate: [AuthGuardService]},
    { path: 'horarios/:com_id', component: HorariosComisionComponent, canActivate: [AuthGuardService]},
    { path: 'horario/new/:com_id', component: HorarioComponent, canActivate: [AuthGuardService]},



]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);