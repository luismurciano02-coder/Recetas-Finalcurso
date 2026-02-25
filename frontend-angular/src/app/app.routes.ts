import { Routes } from '@angular/router';
import { RecetaListComponent } from './components/receta-list/receta-list.component';
import { RecetaDetailComponent } from './components/receta-detail/receta-detail.component';
import { RecetaFormComponent } from './components/receta-form/receta-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/recetas', pathMatch: 'full' },
  { path: 'recetas', component: RecetaListComponent },
  { path: 'receta/:id', component: RecetaDetailComponent },
  { path: 'nueva-receta', component: RecetaFormComponent },
  { path: 'editar/:id', component: RecetaFormComponent },
  { path: '**', redirectTo: '/recetas' }
];