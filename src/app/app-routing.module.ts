import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'empleado-list',
    loadChildren: () => import('./empleado/empleado-list/empleado-list.module').then( m => m.EmpleadoListPageModule)
  },
  {
    path: 'empleado-edit',
    loadChildren: () => import('./empleado/empleado-edit/empleado-edit.module').then( m => m.EmpleadoEditPageModule)
  },
  {
    path: 'empleado-edit/:id',
    loadChildren: () => import('./empleado/empleado-edit/empleado-edit.module').then( m => m.EmpleadoEditPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
