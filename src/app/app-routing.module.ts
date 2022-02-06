import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HierarchyResolverGuard } from './guard/hierarchy.resolver.guard';
import { FullComponent } from './layouts/full/full.component';

const routes: Routes = [
  {
    path: 'blank',
    loadChildren: () =>
      import('./blank/blank.module').then((m) => m.BlankModule),
  },
  {
    path: '',
    component: FullComponent,
    resolve: {
      hierarchy: HierarchyResolverGuard
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./feature/feature.module').then((m) => m.FeatureModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/authentication/404',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
