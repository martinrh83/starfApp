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

export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'ciclos-lectivos', component: CiclosLectivosComponent},
    { path: 'ciclo-lectivo/new', component: CicloLectivoComponent},
    { path: 'niveles', component: NivelesComponent},
    { path: 'nivel/new', component: NivelComponent},
    { path: 'materias', component: MateriasComponent},
    { path: 'materia/new', component: MateriaComponent}

]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);